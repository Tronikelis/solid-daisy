import { mergeRefs } from "@solid-primitives/refs";
import {
    ComponentProps,
    createEffect,
    createSignal,
    createUniqueId,
    splitProps,
} from "solid-js";
import { Portal } from "solid-js/web";

import { useClickOutside } from "~/hooks";
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

    const [modalRef, setModalRef] = createSignal<HTMLDivElement>();
    const [inputRef, setInputRef] = createSignal<HTMLInputElement>();

    const modalId = createUniqueId();

    createEffect(() => {
        if (!modalRef) return;
        if (!inputRef()) return;

        const open = local.open;
        if (open) {
            inputRef()!.checked = true;
            return;
        }

        inputRef()!.checked = false;
    });

    createEffect(() => {
        if (!local.open) return;

        useClickOutside(modalRef(), () => local.setOpen(false));
    });

    return (
        <Portal>
            <input ref={setInputRef} type="checkbox" id={modalId} class="modal-toggle" />

            <div class="modal">
                <div
                    class={cx(
                        "modal-box",
                        !local.open && "!pointer-events-none [&_*]:!pointer-events-none",
                        local.class
                    )}
                    ref={mergeRefs(local.ref, setModalRef)}
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
