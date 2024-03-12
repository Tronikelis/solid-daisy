import { ComponentProps, splitProps } from "solid-js";

import { ForbidChildren, PropsWith } from "~/types";
import { cva, CvaProps } from "~/utils";

const divider = cva("divider m-0", {
    variants: {
        vertical: {
            // yes, this is correct
            true: "divider-horizontal",
        },
    },
});

type Props = PropsWith<CvaProps<typeof divider>, [ComponentProps<"div">]>;

export function Divider(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, ["vertical", "class"]);

    return (
        <div class={divider({ class: local.class, vertical: local.vertical })} {...others} />
    );
}
