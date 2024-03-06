import { ControlledInput } from "solid-controlled-input";
import { ComponentProps, splitProps } from "solid-js";

import { ForbidChildren, PropsWith, WrapperProps } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

import Group from "../Group";

const checkbox = cva("checkbox", {
    variants: {
        color: {
            primary: "checkbox-primary",
            secondary: "checkbox-secondary",
            accent: "checkbox-accent",
            success: "checkbox-success",
            warning: "checkbox-warning",
            info: "checkbox-info",
            error: "checkbox-error",
        },
        size: {
            lg: "checkbox-lg",
            md: "checkbox-md",
            sm: "checkbox-sm",
            xs: "checkbox-xs",
        },
    },
});

type Props = PropsWith<
    {
        label?: string;
        wrapperProps?: WrapperProps<typeof Group>;
    },
    [CvaProps<typeof checkbox>, ComponentProps<typeof ControlledInput>]
>;

export default function Checkbox(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, [
        "label",
        "color",
        "class",
        "size",
        "type",
        "wrapperProps",
    ]);

    return (
        <Group {...local.wrapperProps}>
            <label class="label cursor-pointer gap-3">
                <ControlledInput
                    type="checkbox"
                    class={checkbox({
                        class: local.class,
                        color: local.color,
                        size: local.size,
                    })}
                    {...others}
                />

                {local.label && <span class="label-text">{local.label}</span>}
            </label>
        </Group>
    );
}
