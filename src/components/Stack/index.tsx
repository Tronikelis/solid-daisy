import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types";
import { cva, CvaProps } from "~/utils";

const stack = cva("flex flex-col gap-4");

type Props = PropsWith<CvaProps<typeof stack>, [ComponentProps<"div">]>;

export function Stack(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, ["class", "children"]);

    return (
        <div class={stack({ class: local.class })} {...others}>
            {local.children}
        </div>
    );
}
