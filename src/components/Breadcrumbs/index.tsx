import { ComponentProps, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

const breadcrumbs = cva("breadcrumbs text-sm");

type Props = PropsWith<CvaProps<typeof breadcrumbs>, [ComponentProps<"div">]>;

export function Breadcrumbs(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, ["class", "children"]);

    return (
        <div class={breadcrumbs({ class: local.class })} {...others}>
            <ul>{local.children}</ul>
        </div>
    );
}

export * from "./BreadcrumbsItem";
