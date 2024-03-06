import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

const tooltip = cva("tooltip", {
    variants: {
        opened: {
            true: "tooltip-open",
        },
        position: {
            top: "tooltip-top",
            bottom: "tooltip-bottom",
            left: "tooltip-left",
            right: "tooltip-right",
        },
        color: {
            primary: "tooltip-primary",
            secondary: "tooltip-secondary",
            accent: "tooltip-accent",
            info: "tooltip-info",
            success: "tooltip-success",
            warning: "tooltip-warning",
            error: "tooltip-error",
        },
    },
});

type Props = PropsWith<
    {
        label: string;
    },
    [CvaProps<typeof tooltip>, ComponentProps<"div">]
>;

export function Tooltip(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "label",
        "opened",
        "position",
        "color",
        "class",
        "children",
    ]);

    return (
        <div
            class={tooltip({
                class: local.class,
                color: local.color,
                opened: local.opened,
                position: local.position,
            })}
            data-tip={local.label}
            {...others}
        >
            {local.children}
        </div>
    );
}
