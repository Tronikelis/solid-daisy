/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";

import { Input } from ".";

describe("<Input />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Input />);
        expect(container).toMatchSnapshot();
    });

    it("controlled input works", async () => {
        const [value, setValue] = createSignal("");

        const screen = render(() => (
            <Input
                data-testid="input"
                value={value()}
                onInput={e => setValue(e.target.value)}
            />
        ));

        expect(screen.getByTestId("input")).toHaveValue("");

        setValue("xd");

        expect(screen.getByTestId("input")).toHaveValue("xd");

        await userEvent.type(screen.getByTestId("input"), "foobar");

        expect(value()).toBe("xdfoobar");
        expect(screen.getByTestId("input")).toHaveValue("xdfoobar");
    });

    it("left and right sections render", () => {
        const screen = render(() => (
            <Input leftSection={<div>left</div>} rightSection={<div>right</div>} />
        ));

        expect(screen.getByText("left")).toBeInTheDocument();
        expect(screen.getByText("right")).toBeInTheDocument();
    });

    it("requiredHtml has priority", () => {
        const screen = render(() => (
            <Input data-testid="input" required requiredHtml={false} />
        ));

        expect(screen.getByTestId("input")).not.toBeRequired();
    });
});
