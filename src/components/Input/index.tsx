import { ControlledInput } from "solid-controlled-input";
import { ComponentProps, JSX, splitProps } from "solid-js";

import { ForbidChildren, PropsWith, WrapperProps } from "~/types/utils";
import { cva, CvaProps, cx } from "~/utils/cva";

import Group from "../Group";
import Stack from "../Stack";

const container = cva("input h-auto", {
    variants: {
        bordered: {
            true: "input-bordered",
        },
        disabled: {
            true: "input-disabled",
        },
        size: {
            xs: "min-h-6 py-0.5",
            sm: "min-h-8 py-1",
            md: "min-h-12 py-2",
            lg: "min-h-16 py-3",
        },
        color: {
            primary: "input-primary",
            secondary: "input-secondary",
            accent: "input-accent",
            info: "input-info",
            success: "input-success",
            warning: "input-warning",
            error: "input-error",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

type Props = PropsWith<
    {
        label?: string;
        description?: string;
        requiredHtml?: boolean;

        leftSection?: JSX.Element;
        rightSection?: JSX.Element;

        wrapperProps?: WrapperProps<typeof Stack>;
        containerProps?: WrapperProps<typeof Stack>;
    },
    [CvaProps<typeof container>, ComponentProps<typeof ControlledInput>]
>;

export default function Input(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, [
        "label",
        "bordered",
        "rightSection",
        "description",
        "leftSection",
        "class",
        "requiredHtml",
        "required",
        "size",
        "color",
        "wrapperProps",
        "containerProps",
    ]);

    return (
        <Stack {...local.wrapperProps} class={cx("gap-0", local.wrapperProps?.class)}>
            {local.label && (
                <label class="label">
                    <span class="label-text">
                        {local.label}
                        {local.required && <span class="text-error"> *</span>}
                    </span>
                </label>
            )}

            <Stack
                {...local.containerProps}
                class={cx(
                    container({
                        bordered: local.bordered,
                        class: local.containerProps?.class,
                        color: local.color,
                        disabled: others.disabled,
                        size: local.size,
                    }),
                    "justify-center",
                    local.rightSection && "pr-2",
                    local.leftSection && "pl-2"
                )}
            >
                <Group
                    class={cx(
                        "flex-wrap gap-1",
                        // upper input-disabled sets the pointer events
                        // so ignore lower down
                        others.disabled && "pointer-events-none"
                    )}
                >
                    {local.leftSection}

                    <ControlledInput
                        class="min-w-6 flex-1 border-none bg-transparent outline-none placeholder-shown:text-ellipsis"
                        required={local.requiredHtml ?? local.required}
                        {...others}
                    />

                    {local.rightSection}
                </Group>
            </Stack>

            {local.description && (
                <label class="label">
                    <span class="label-text-alt whitespace-pre-line">{local.description}</span>
                </label>
            )}
        </Stack>
    );
}
