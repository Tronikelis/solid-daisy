import { ComponentProps, splitProps } from "solid-js";

import { MiniSetter, PropsWith, RequireChildren, SelectableSize } from "~/types";
import { cva, CvaProps } from "~/utils";

import { TabsContext } from "./context";

const tabs = cva("tabs", {
    variants: {
        variant: {
            boxed: "tabs-boxed",
            lifted: "tabs-lifted",
            bordered: "tabs-bordered",
        },
        size: {
            xs: "tabs-xs",
            sm: "tabs-sm",
            md: "tabs-md",
            lg: "tabs-lg",
        },
    },
});

type Props<T extends string> = PropsWith<
    {
        size?: SelectableSize;
        selected: T;
        setSelected: MiniSetter<T>;
    },
    [CvaProps<typeof tabs>, ComponentProps<"div">]
>;

export function Tabs<T extends string>(props: RequireChildren<Props<T>>) {
    const [local, others] = splitProps(props, [
        "variant",
        "children",
        "size",
        "class",
        "selected",
        "setSelected",
    ]);

    return (
        <TabsContext.Provider value={props as unknown as RequireChildren<Props<string>>}>
            <div
                class={tabs({
                    class: local.class,
                    variant: local.variant,
                    size: local.size,
                })}
                {...others}
            >
                {local.children}
            </div>
        </TabsContext.Provider>
    );
}

export * from "./Tab";
