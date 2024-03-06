import { createEventListener } from "@solid-primitives/event-listener";
import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, splitProps, useContext } from "solid-js";

import { PropsWith, RequireChildren } from "~/types";
import { cva, CvaProps } from "~/utils";

import { AccordionContext } from "../context";

const accordionItem = cva("collapse collapse-arrow bg-base-200", {
    variants: {
        joined: {
            true: "join-item border border-base-300",
        },
    },
});

type Props = PropsWith<
    {
        value?: string;
        title?: string;
    },
    [CvaProps<typeof accordionItem>, ComponentProps<"div">]
>;

export function AccordionItem(props: RequireChildren<Props>) {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("accordion item without context");

    const [local, others] = splitProps(props, ["class", "children", "value", "title", "ref"]);

    let ref: HTMLDivElement | undefined;

    const checked = () => {
        if (context.selected) return undefined;
        return context.selected === local.value;
    };

    const onClick = () => {
        if (!local.value) return;
        context.setSelected?.(local.value);
    };
    createEventListener(() => ref, "click", onClick);

    return (
        <div
            class={accordionItem({ class: local.class, joined: context.joined })}
            ref={mergeRefs(local.ref, el => (ref = el))}
            {...others}
        >
            <input type="radio" name={context.name} checked={checked()} />

            {local.title && (
                <div class="collapse-title text-xl font-medium">{local.title}</div>
            )}

            <div class="collapse-content">{local.children}</div>
        </div>
    );
}
