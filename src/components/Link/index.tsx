import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

const link = cva("link", {
    variants: {
        italic: {
            true: "italic",
        },
        bold: {
            true: "font-bold",
        },
        hover: {
            true: "link-hover",
        },
        color: {
            primary: "link-primary",
            secondary: "link-secondary",
            accent: "link-accent",
            neutral: "link-neutral",
            success: "link-success",
            info: "link-info",
            warning: "link-warning",
            error: "link-error",
        },
    },
});

type Props = PropsWith<CvaProps<typeof link>, [ComponentProps<"a">]>;

export default function Link(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "hover",
        "color",
        "class",
        "italic",
        "bold",
        "children",
    ]);

    return (
        <a
            class={link({
                class: local.class,
                color: local.color,
                hover: local.hover,
                italic: local.italic,
                bold: local.bold,
            })}
            {...others}
        >
            {local.children}
        </a>
    );
}
