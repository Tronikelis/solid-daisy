import { ComponentProps, splitProps } from "solid-js";

import {
    MiniSetter,
    PropsWith,
    RequireChildren,
    SelectableColor,
    SelectableSize,
} from "~/types";
import { cx } from "~/utils";

import { Stack } from "../";

import { RadioContext } from "./context";

type Props<T extends string> = PropsWith<
    {
        color?: SelectableColor;
        size?: SelectableSize;

        selected: T;
        setSelected: MiniSetter<T>;
    },
    [ComponentProps<typeof Stack>]
>;

export function Radio<T extends string>(props: RequireChildren<Props<T>>) {
    const [local, others] = splitProps(props, [
        "color",
        "size",
        "children",
        "selected",
        "setSelected",
        "class",
    ]);

    return (
        <RadioContext.Provider value={props as unknown as RequireChildren<Props<string>>}>
            <Stack class={cx("gap-0", local.class)} {...others}>
                {local.children}
            </Stack>
        </RadioContext.Provider>
    );
}

export * from "./RadioItem";
