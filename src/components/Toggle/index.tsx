import { ControlledInput } from "solid-controlled-input";
import { ComponentProps, splitProps } from "solid-js";

import { ForbidChildren, PropsWith, WrapperProps } from "~/types";
import { cva, CvaProps } from "~/utils";

import { Group } from "../";

const toggle = cva("toggle");

type Props = PropsWith<
    {
        label?: string;
        wrapperProps?: WrapperProps<typeof Group>;
    },
    [CvaProps<typeof toggle>, ComponentProps<typeof ControlledInput>]
>;

export function Toggle(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, ["class", "label", "wrapperProps"]);

    const renderInput = () => (
        <ControlledInput type="checkbox" class={toggle({ class: local.class })} {...others} />
    );

    return (
        <Group {...local.wrapperProps}>
            {local.label ? (
                <label class="label cursor-pointer gap-3">
                    {renderInput()}
                    <span class="label-text">{local.label}</span>
                </label>
            ) : (
                renderInput()
            )}
        </Group>
    );
}
