import { ComponentProps, Setter, splitProps } from "solid-js";

import Button from "~/components/Button";
import { PropsWith, RequireChildren } from "~/types/utils";
import { cx } from "~/utils/cva";

type Props = PropsWith<
    {
        page: number;
        value: number;
        setValue: MiniSetter<number>;
    },
    [ComponentProps<typeof Button>]
>;

export default function PaginationItem(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, ["setValue", "page", "value", "children"]);

    const active = () => local.value === local.page;

    return (
        <Button
            onClick={() => local.setValue(local.page)}
            class={cx(active() && "btn-active")}
            color={active() ? "primary" : undefined}
            outlined={!active()}
            square
            {...others}
        >
            {local.children}
        </Button>
    );
}
