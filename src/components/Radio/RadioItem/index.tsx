import { createEventListener } from "@solid-primitives/event-listener";
import { mergeRefs } from "@solid-primitives/refs";
import { ControlledInput } from "solid-controlled-input";
import { ComponentProps, splitProps, useContext } from "solid-js";

import Group from "~/components/Group";
import { ForbidChildren, PropsWith, WrapperProps } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

import { RadioContext } from "../context";

const radioItem = cva("radio", {
    variants: {
        size: {
            xs: "radio-xs",
            sm: "radio-sm",
            md: "radio-md",
            lg: "radio-lg",
        },
        color: {
            primary: "radio-primary",
            secondary: "radio-secondary",
            accent: "radio-accent",
            success: "radio-success",
            warning: "radio-warning",
            info: "radio-info",
            error: "radio-error",
        },
    },
});

type Props = PropsWith<
    {
        value?: string;
        label?: string;
        wrapperProps?: WrapperProps<typeof Group>;
    },
    [CvaProps<typeof radioItem>, ComponentProps<typeof ControlledInput>]
>;

export function RadioItem(props: ForbidChildren<Props>) {
    const context = useContext(RadioContext);

    const [local, others] = splitProps(props, [
        "value",
        "label",
        "class",
        "ref",
        "color",
        "size",
        "wrapperProps",
    ]);

    let ref: HTMLInputElement | undefined;

    const onInput = () => {
        if (local.value && context) {
            context.setSelected(local.value);
        }
    };
    createEventListener(() => ref, "input", onInput);

    return (
        <Group {...local.wrapperProps}>
            <label class="label cursor-pointer gap-3">
                <ControlledInput
                    type="radio"
                    class={radioItem({
                        class: local.class,
                        color: local.color || context?.color,
                        size: local.size || context?.size,
                    })}
                    checked={context?.selected === local.value}
                    ref={mergeRefs(local.ref, el => (ref = el))}
                    {...others}
                />

                {local.label && <span class="label-text">{local.label}</span>}
            </label>
        </Group>
    );
}
