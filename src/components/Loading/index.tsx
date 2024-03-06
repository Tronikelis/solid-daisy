import { ComponentProps, splitProps } from "solid-js";

import { ForbidChildren, PropsWith } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

const loading = cva("loading loading-spinner", {
    variants: {
        size: {
            xs: "loading-xs",
            sm: "loading-sm",
            md: "loading-md",
            lg: "loading-lg",
        },
    },
});

type Props = PropsWith<CvaProps<typeof loading>, [ComponentProps<"div">]>;

export function Loading(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, ["size", "class"]);

    return <div class={loading({ class: local.class, size: local.size })} {...others} />;
}
