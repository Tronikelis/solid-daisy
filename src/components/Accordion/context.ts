import { ComponentProps, createContext } from "solid-js";

import type { Accordion } from ".";

export type AccordionContextValue = ComponentProps<typeof Accordion<string>> & {
    name: string;
};

export const AccordionContext = createContext<AccordionContextValue>();
