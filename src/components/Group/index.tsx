import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

const group = cva("flex flex-row items-center gap-4");

type Props = PropsWith<CvaProps<typeof group>, [ComponentProps<"div">]>;

export function Group(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, ["class", "children"]);

    return (
        <div class={group({ class: local.class })} {...others}>
            {local.children}
        </div>
    );
}
