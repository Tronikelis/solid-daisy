/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";

import { Toggle } from ".";

describe("<Toggle />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Toggle />);
        expect(container).toMatchSnapshot();
    });

    it("controlled input works", async () => {
        const [checked, setChecked] = createSignal(false);

        const screen = render(() => (
            <Toggle
                label="foo"
                data-testid="foo"
                checked={checked()}
                onInput={e => setChecked(e.target.checked)}
            />
        ));

        expect(screen.getByTestId("foo")).not.toBeChecked();

        await userEvent.click(screen.getByText("foo"));

        expect(screen.getByTestId("foo")).toBeChecked();
        expect(checked()).toBe(true);

        setChecked(false);
        expect(screen.getByTestId("foo")).not.toBeChecked();
    });
});
