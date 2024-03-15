/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { ComponentProps, createSignal } from "solid-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Pagination } from ".";

describe("<Pagination />", () => {
    let props: ComponentProps<typeof Pagination>;

    beforeEach(() => {
        props = {
            leftArrowIcon: <div>left</div>,
            rightArrowIcon: <div>right</div>,
            dotsIcon: <div>dots</div>,

            total: 24,
            value: 0,
            setValue: vi.fn(),
        };
    });

    it("renders correctly", () => {
        const { container } = render(() => <Pagination {...props} />);
        expect(container).toMatchSnapshot();
    });

    it("shows left & right on 0 total", () => {
        const screen = render(() => <Pagination {...props} total={0} />);

        expect(screen.getByText("left")).toBeInTheDocument();
        expect(screen.getByText("right")).toBeInTheDocument();

        expect(screen.queryByText("1")).not.toBeInTheDocument();
    });

    it("simple navigation works", async () => {
        const [page, setPage] = createSignal(0);

        const screen = render(() => (
            <Pagination {...props} value={page()} setValue={setPage} />
        ));

        expect(screen.getByText("1")).toHaveClass("btn-active");

        await userEvent.click(screen.getByText("left"));

        expect(screen.getByText("1")).toHaveClass("btn-active");

        await userEvent.click(screen.getByText("right"));

        expect(screen.getByText("1")).not.toHaveClass("btn-active");
        expect(screen.getByText("2")).toHaveClass("btn-active");
        expect(page()).toBe(1);
    });

    it.each([0, 1, 2, 3, 4, 5, 6, 7])("total %i does not show dots", index => {
        const screen = render(() => <Pagination {...props} total={index} />);

        new Array(index)
            .fill(0)
            .map((_, i) => i + 1)
            .forEach(index => {
                expect(screen.getByText(index)).toBeInTheDocument();
            });

        expect(screen.queryByText("dots")).not.toBeInTheDocument();
    });

    it("boundaries work", () => {
        let screen = render(() => <Pagination {...props} boundaries={1} value={10} />);

        ["1", "dots", "10", "11", "12", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        screen = render(() => <Pagination {...props} boundaries={2} value={10} />);

        ["1", "2", "dots", "10", "11", "12", "dots", "23", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        screen = render(() => <Pagination {...props} boundaries={0} value={10} />);

        expect(screen.queryByText("1")).not.toBeInTheDocument();
        expect(screen.queryByText("24")).not.toBeInTheDocument();
    });

    it("siblings work", () => {
        let screen = render(() => <Pagination {...props} siblings={1} value={10} />);

        ["1", "dots", "10", "11", "12", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        screen = render(() => <Pagination {...props} siblings={2} value={10} />);

        ["1", "dots", "9", "10", "11", "12", "13", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        screen = render(() => <Pagination {...props} siblings={0} value={10} />);

        expect(screen.queryByText("10")).not.toBeInTheDocument();
        expect(screen.queryByText("12")).not.toBeInTheDocument();
    });

    it("navigation dynamically switches to dots to the right", async () => {
        const [page, setPage] = createSignal(0);

        const screen = render(() => (
            <Pagination {...props} value={page()} setValue={setPage} />
        ));

        ["1", "2", "3", "4", "5", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("right"));

        ["1", "2", "3", "4", "5", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("right"));

        ["1", "2", "3", "4", "5", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("right"));

        ["1", "dots", "3", "4", "5", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("right"));

        ["1", "dots", "4", "5", "6", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });
    });

    it("navigation dynamically switches to dots to the left", async () => {
        const [page, setPage] = createSignal(23);

        const screen = render(() => (
            <Pagination {...props} value={page()} setValue={setPage} />
        ));

        ["1", "dots", "20", "21", "22", "23", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("left"));

        ["1", "dots", "20", "21", "22", "23", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("left"));

        ["1", "dots", "20", "21", "22", "23", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("left"));

        ["1", "dots", "20", "21", "22", "dots", "24"].forEach(select => {
            expect(screen.getByText(select)).toBeInTheDocument();
        });
    });
});
