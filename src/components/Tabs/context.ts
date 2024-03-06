import { ComponentProps, createContext } from "solid-js";

import { Tabs } from ".";

export const TabsContext = createContext<ComponentProps<typeof Tabs<string>>>();
