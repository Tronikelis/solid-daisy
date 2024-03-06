import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types";
import { cva, CvaProps } from "~/utils";

const badge = cva("badge truncate whitespace-nowrap", {
    variants: {
        color: {
            neutral: "badge-neutral",
            primary: "badge-primary",
            secondary: "badge-secondary",
            accent: "badge-accent",
            ghost: "badge-ghost",
            info: "badge-info",
            success: "badge-success",
            warning: "badge-warning",
            error: "badge-error",
        },
        size: {
            xs: "badge-xs",
            sm: "badge-sm",
            md: "badge-md",
            lg: "badge-lg",
        },
        outlined: {
            true: "badge-outline",
        },
    },
});

type Props = PropsWith<CvaProps<typeof badge>, [ComponentProps<"span">]>;

export function Badge(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "color",
        "size",
        "class",
        "outlined",
        "children",
    ]);

    return (
        <span
            class={badge({
                class: local.class,
                color: local.color,
                size: local.size,
                outlined: local.outlined,
            })}
            {...others}
        >
            {local.children}
        </span>
    );
}
