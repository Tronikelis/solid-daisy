/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";

import { Textarea } from ".";

describe("<Textarea />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Textarea />);
        expect(container).toMatchSnapshot();
    });

    it("controlled input works", async () => {
        const [value, setValue] = createSignal("");

        const screen = render(() => (
            <Textarea
                data-testid="textarea"
                value={value()}
                onInput={e => setValue(e.target.value)}
            />
        ));

        await userEvent.type(screen.getByTestId("textarea"), "foobar");

        expect(value()).toBe("foobar");
        expect(screen.getByTestId("textarea")).toHaveValue("foobar");

        setValue("bar");
        expect(screen.getByTestId("textarea")).toHaveValue("bar");
    });
});
