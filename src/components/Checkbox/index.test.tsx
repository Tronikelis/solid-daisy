/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";

import { Checkbox } from ".";

describe("<Checkbox />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Checkbox />);
        expect(container).toMatchSnapshot();
    });

    it("controlled input works", async () => {
        const [checked, setChecked] = createSignal(false);

        const screen = render(() => (
            <Checkbox
                data-testid="checkbox"
                checked={checked()}
                onInput={e => setChecked(e.target.checked)}
            />
        ));

        expect(screen.getByTestId("checkbox")).not.toBeChecked();

        await userEvent.click(screen.getByTestId("checkbox"));

        expect(checked()).toBe(true);
        expect(screen.getByTestId("checkbox")).toBeChecked();

        setChecked(false);

        expect(screen.getByTestId("checkbox")).not.toBeChecked();
    });
});
