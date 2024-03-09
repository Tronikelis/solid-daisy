import { ControlledTextarea } from "solid-controlled-input";
import { ComponentProps, splitProps } from "solid-js";

import { ForbidChildren, PropsWith, WrapperProps } from "~/types";
import { cva, CvaProps, cx } from "~/utils";

import { Stack } from "../";

const textarea = cva("textarea", {
    variants: {
        bordered: {
            true: "textarea-bordered",
        },
    },
});

type Props = PropsWith<
    {
        label?: string;
        description?: string;
        wrapperProps?: WrapperProps<typeof Stack>;
    },
    [CvaProps<typeof textarea>, ComponentProps<typeof ControlledTextarea>]
>;

export function Textarea(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, [
        "label",
        "description",
        "bordered",
        "class",
        "wrapperProps",
    ]);

    return (
        <Stack {...local.wrapperProps}>
            {local.label && (
                <label class="label">
                    <span class="label-text">
                        {local.label}
                        {others.required && <span class="text-error"> *</span>}
                    </span>
                </label>
            )}

            <ControlledTextarea
                class={cx(
                    textarea({ class: local.class, bordered: local.bordered }),
                    "text-inherit"
                )}
                {...others}
            />

            {local.description && (
                <label class="label">
                    <span class="label-text-alt">{local.description}</span>
                </label>
            )}
        </Stack>
    );
}
