import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

const card = cva("rounded-2xl bg-base-100 p-4", {
    variants: {
        withShadow: {
            true: "shadow-xl",
        },
        bordered: {
            true: "border border-gray-200",
        },
        compact: {
            true: "p-0",
        },
    },

    defaultVariants: {
        withShadow: true,
        bordered: true,
    },
});

type Props = PropsWith<CvaProps<typeof card>, [ComponentProps<"div">]>;

export default function Card(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "withShadow",
        "bordered",
        "compact",
    ]);

    return (
        <div
            class={card({
                class: local.class,
                withShadow: local.withShadow,
                bordered: local.bordered,
                compact: local.compact,
            })}
            {...others}
        >
            {local.children}
        </div>
    );
}
