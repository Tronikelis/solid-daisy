import { ComponentProps, splitProps } from "solid-js";

import { RequireChildren } from "~/types";

type Props = ComponentProps<"li">;

export function BreadcrumbsItem(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, ["children"]);

    return <li {...others}>{local.children}</li>;
}
