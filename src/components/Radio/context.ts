import { ComponentProps, createContext } from "solid-js";

import { Radio } from ".";

export const RadioContext = createContext<ComponentProps<typeof Radio<string>>>();
