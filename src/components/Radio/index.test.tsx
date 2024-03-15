/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it, vi } from "vitest";

import { Radio, RadioItem } from ".";

describe("<Radio />", () => {
    it("renders correctly", () => {
        const { container } = render(() => (
            <Radio selected="" setSelected={vi.fn()}>
                <RadioItem label="what's up" />
            </Radio>
        ));

        expect(container).toMatchSnapshot();
    });

    it("controlled input works", async () => {
        const [selected, setSelected] = createSignal("");

        const screen = render(() => (
            <Radio selected={selected()} setSelected={setSelected}>
                <RadioItem data-testid="foo" value="foo" label="foo" />
                <RadioItem data-testid="bar" value="bar" label="bar" />
            </Radio>
        ));

        await userEvent.click(screen.getByText("foo"));

        expect(selected()).toBe("foo");
        expect(screen.getByTestId("foo")).toBeChecked();

        setSelected("bar");

        expect(screen.getByTestId("foo")).not.toBeChecked();
        expect(screen.getByTestId("bar")).toBeChecked();
    });
});
