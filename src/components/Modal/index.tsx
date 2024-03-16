import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, createUniqueId, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

import { useClickOutside, useRef } from "~/hooks";
import { MiniSetter, PropsWith, RequireChildren } from "~/types";
import { cx } from "~/utils";

import { Button, Group, Stack, Text } from "../";

type Props = PropsWith<
    {
        title?: string;
        open: boolean;
        setOpen: MiniSetter<boolean>;
    },
    [ComponentProps<"div">]
>;

export function Modal(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "open",
        "setOpen",
        "children",
        "ref",
        "title",
        "class",
    ]);

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
        <Portal>
            <input ref={setInputRef} type="checkbox" id={modalId} class="modal-toggle" />

            <div ref={setDialogRef} class={cx("modal", !local.open && "pointer-events-none")}>
                <div
                    class={cx("modal-box", local.class)}
                    ref={mergeRefs(local.ref, setModalBoxRef)}
                    {...others}
                >
                    <Stack>
                        <Group class={local.title ? "justify-between" : "justify-end"}>
                            {local.title && (
                                <Text bold size="lg">
                                    {local.title}
                                </Text>
                            )}
                            <Button
                                size="sm"
                                color="ghost"
                                circle
                                onClick={() => local.setOpen(false)}
                                data-testid="modal-x"
                            >
                                {"✕"}
                            </Button>
                        </Group>

                        {local.children}
                    </Stack>
                </div>
            </div>
        </Portal>
    );
}
