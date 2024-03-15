import { ComponentProps, JSX, splitProps } from "solid-js";

import { MaybeChildren, PropsWith } from "~/types";
import { cva, CvaProps } from "~/utils";

import { Loading } from "../";

const button = cva("btn", {
    variants: {
        outlined: {
            true: "btn-outline",
        },
        size: {
            xs: "btn-xs",
            sm: "btn-sm",
            md: "btn-md",
            lg: "btn-lg",
        },
        square: {
            true: "btn-square",
        },
        circle: {
            true: "btn-circle",
        },
        color: {
            info: "btn-info",
            success: "btn-success",
            warning: "btn-warning",
            error: "btn-error",
            primary: "btn-primary",
            secondary: "btn-secondary",
            neutral: "btn-neutral",
            ghost: "btn-ghost",
        },
    },
});

type Props = PropsWith<
    {
        rightIcon?: JSX.Element;
        leftIcon?: JSX.Element;
        loading?: boolean;
    },
    [CvaProps<typeof button>, ComponentProps<"button">]
>;

export function Button(props: MaybeChildren<Props>) {
    const [local, others] = splitProps(props, [
        "class",
        "size",
        "rightIcon",
        "leftIcon",
        "square",
        "circle",
        "children",
        "color",
        "outlined",
        "loading",
        "disabled",
    ]);

    return (
        <button
            class={button({
                class: local.class,
                circle: local.circle,
                size: local.size,
                square: local.square,
                color: local.color,
                outlined: local.outlined,
            })}
            disabled={local.loading || local.disabled}
            type="button"
            {...others}
        >
            {local.leftIcon && !local.loading && <span>{local.leftIcon}</span>}

            {local.loading && <Loading size="sm" />}
            {local.children}

            {local.rightIcon && <span>{local.rightIcon}</span>}
        </button>
    );
}
