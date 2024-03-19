import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

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

    it("calls onOpenChange when opened state changes", async () => {
        const onOpenChange = vi.fn();

        const screen = render(() => (
            <>
                <div id="target">target</div>
                <Dropdown
                    onOpenChange={onOpenChange}
                    data-testid="dropdown"
                    targetRef={document.getElementById("target")!}
                >
                    foo
                </Dropdown>
            </>
        ));

        // on mount
        expect(onOpenChange).toBeCalledTimes(1);
        expect(onOpenChange).toBeCalledWith(false);

        await userEvent.click(screen.getByText("target"));

        // change
        expect(onOpenChange).toBeCalledTimes(2);
        expect(onOpenChange).toBeCalledWith(true);
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
