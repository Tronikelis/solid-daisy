import { ComponentProps, createUniqueId, mergeProps, splitProps } from "solid-js";

import { MiniSetter, PropsWith, RequireChildren } from "~/types";
import { cva, CvaProps } from "~/utils";

import { Stack } from "../";

import { AccordionContext, AccordionContextValue } from "./context";

const accordion = cva("gap-2", {
    variants: {
        joined: {
            true: "join join-vertical gap-0",
        },
    },
});

type Props<T extends string> = PropsWith<
    {
        selected?: T;
        setSelected?: MiniSetter<T>;
    },
    [CvaProps<typeof accordion>, ComponentProps<typeof Stack>]
>;

export function Accordion<T extends string>(props: RequireChildren<Props<T>>) {
    const name = createUniqueId();

    const [local, others] = splitProps(props, ["children", "class", "joined"]);

    const value = mergeProps(props, { name });

    return (
        <AccordionContext.Provider value={value as AccordionContextValue}>
            <Stack class={accordion({ class: local.class, joined: local.joined })} {...others}>
                {local.children}
            </Stack>
        </AccordionContext.Provider>
    );
}

export * from "./AccordionItem";
