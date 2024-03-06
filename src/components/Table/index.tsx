import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types";
import { cva, CvaProps } from "~/utils";

import { Card } from "../";

const table = cva("table", {
    variants: {
        striped: {
            true: "table-zebra",
        },
        size: {
            xs: "table-xs",
            sm: "table-sm",
            md: "table-md",
            lg: "table-lg",
        },
        stickyHead: {
            // yes, this is correct, daisyui does things in reverse huh
            true: "table-pin-rows",
        },
    },
});

type Props = PropsWith<CvaProps<typeof table>, [ComponentProps<"table">]>;

export function Table(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "striped",
        "children",
        "class",
        "size",
        "stickyHead",
    ]);

    return (
        <Card compact withShadow={false} class="overflow-hidden">
            <div class="overflow-x-auto">
                <table
                    class={table({
                        class: local.class,
                        striped: local.striped,
                        size: local.size,
                        stickyHead: local.stickyHead,
                    })}
                    {...others}
                >
                    {local.children}
                </table>
            </div>
        </Card>
    );
}
