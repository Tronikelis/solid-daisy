import { createEventListener } from "@solid-primitives/event-listener";
import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, splitProps, useContext } from "solid-js";

import { PropsWith, RequireChildren } from "~/types";
import { cva, CvaProps, cx } from "~/utils";

import { TabsContext } from "../context";

const tab = cva("tab");

type Props = PropsWith<
    {
        value: string;
    },
    [CvaProps<typeof tab>, ComponentProps<"div">]
>;

export function Tab(props: RequireChildren<Props>) {
    const context = useContext(TabsContext);
    if (!context) throw new Error("Tab was used without Tabs parent");

    const [local, others] = splitProps(props, ["class", "children", "value", "ref"]);

    let ref: HTMLDivElement | undefined;

    const onClick = () => context.setSelected(local.value);
    createEventListener(() => ref, "click", onClick);

    return (
        <div
            class={cx(
                context.selected === local.value && "tab-active",
                tab({ class: local.class })
            )}
            ref={mergeRefs(local.ref, el => (ref = el))}
            {...others}
        >
            {local.children}
        </div>
    );
}
