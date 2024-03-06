import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types";
import { cva, CvaProps } from "~/utils";

const text = cva("text-base", {
    variants: {
        dimmed: {
            true: "text-neutral-400",
        },
        italic: {
            true: "italic",
        },
        bold: {
            true: "font-bold",
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            xl2: "text-2xl",
            xl4: "text-4xl",
        },
        centered: {
            true: "text-center",
        },
        underlined: {
            true: "underline",
        },
        breakWords: {
            true: "min-w-0 break-words",
        },
    },
});

type Props = PropsWith<CvaProps<typeof text>, [ComponentProps<"p">]>;

export function Text(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "class",
        "dimmed",
        "size",
        "italic",
        "bold",
        "centered",
        "children",
        "underlined",
        "breakWords",
    ]);

    return (
        <p
            class={text({
                class: local.class,
                dimmed: local.dimmed,
                size: local.size,
                bold: local.bold,
                italic: local.italic,
                centered: local.centered,
                underlined: local.underlined,
                breakWords: local.breakWords,
            })}
            {...others}
        >
            {local.children}
        </p>
    );
}
