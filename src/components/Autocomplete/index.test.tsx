import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "solid-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Autocomplete } from ".";

describe("<Autocomplete />", () => {
    let props: ComponentProps<typeof Autocomplete>;

    beforeEach(() => {
        props = {
            items: [],
            value: [],
            setValue: vi.fn(),
        };
    });

    it("renders correctly", () => {
        const { container } = render(() => <Autocomplete {...props} />);
        expect(container).toMatchSnapshot();
    });

    it("dropdown opens on input focus and closes on blur", async () => {
        const screen = render(() => (
            <>
                <div>outside</div>
                <Autocomplete {...props} data-testid="input" />
            </>
        ));

        await userEvent.click(screen.getByTestId("input"));

        expect(screen.getByTestId("dropdown")).toHaveClass("visible");

        await userEvent.click(screen.getByText("outside"));

        expect(screen.getByTestId("dropdown")).toHaveClass("invisible");
    });

    it("dropdown shows items");
});
