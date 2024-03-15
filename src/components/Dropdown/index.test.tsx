import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Dropdown } from ".";

describe("<Dropdown />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Dropdown targetRef={undefined}>foo</Dropdown>);
        expect(container).toMatchSnapshot();
    });

    it("shows on target click", async () => {
        const screen = render(() => (
            <>
                <div id="target">target</div>
                <Dropdown
                    data-testid="dropdown"
                    targetRef={document.getElementById("target")!}
                >
                    foo
                </Dropdown>
            </>
        ));

        expect(screen.getByTestId("dropdown")).toHaveClass("invisible");

        await userEvent.click(screen.getByText("target"));

        expect(screen.getByTestId("dropdown")).toHaveClass("visible");

        await userEvent.click(screen.getByText("target"));

        expect(screen.getByTestId("dropdown")).toHaveClass("invisible");
    });

    it("hover option works", async () => {
        const screen = render(() => (
            <>
                <div id="target">target</div>
                <Dropdown
                    hover
                    data-testid="dropdown"
                    targetRef={document.getElementById("target")!}
                >
                    foo
                </Dropdown>
            </>
        ));

        expect(screen.getByTestId("dropdown")).toHaveClass("invisible");

        await userEvent.hover(screen.getByText("target"));

        expect(screen.getByTestId("dropdown")).toHaveClass("visible");

        await userEvent.unhover(screen.getByText("target"));

        expect(screen.getByTestId("dropdown")).toHaveClass("invisible");
    });
});
