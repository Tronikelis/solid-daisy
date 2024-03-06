import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, createUniqueId, splitProps } from "solid-js";

import { useClickOutside, useRef } from "~/hooks";
import { MiniSetter, PropsWith, RequireChildren } from "~/types";

type Props = PropsWith<
    {
        open: boolean;
        setOpen: MiniSetter<boolean>;
    },
    [ComponentProps<"div">]
>;

export function Modal(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, ["open", "setOpen", "children", "ref"]);

    const [dialogRef, setDialogRef] = useRef<HTMLDivElement>();
    const [inputRef, setInputRef] = useRef<HTMLInputElement>();
    const [modalBoxRef, setModalBoxRef] = useRef<HTMLDivElement>();

    const modalId = createUniqueId();

    createEffect(() => {
        if (!dialogRef) return;
        if (!inputRef.value) return;

        const open = local.open;
        if (open) {
            inputRef.value.checked = true;
            return;
        }

        inputRef.value.checked = false;
    });

    createEffect(() => {
        if (!local.open) return;

        useClickOutside(modalBoxRef.value, () => local.setOpen(false));
    });

    return (
        <>
            <input ref={setInputRef} type="checkbox" id={modalId} class="modal-toggle" />

            <div ref={setDialogRef} class="modal">
                <div class="modal-box" ref={mergeRefs(local.ref, setModalBoxRef)} {...others}>
                    {local.children}
                </div>
            </div>
        </>
    );
}
