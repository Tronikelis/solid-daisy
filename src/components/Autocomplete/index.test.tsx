/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { ComponentProps, createSignal } from "solid-js";
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

    describe("with items", () => {
        beforeEach(() => {
            props.items = [{ value: "foobar" }, { value: "let's go" }];
        });

        it("dropdown shows items", () => {
            const screen = render(() => <Autocomplete {...props} />);

            expect(screen.getByText("foobar")).toBeInTheDocument();
            expect(screen.getByText("let's go")).toBeInTheDocument();
        });

        it("selecting item works", async () => {
            const [value, setValue] = createSignal<{ value: string }[]>([]);

            const screen = render(() => (
                <Autocomplete {...props} value={value()} setValue={setValue} />
            ));

            await userEvent.click(screen.getByText("foobar"));

            expect(screen.getAllByText("foobar")).toHaveLength(2);
            expect(value()).toStrictEqual([{ value: "foobar" }]);

            await userEvent.click(screen.getAllByText("foobar")[1]!);

            expect(value()).toStrictEqual([]);
            expect(screen.getAllByText("foobar")).toHaveLength(1);
        });

        it("default filtering works", () => {
            props.items = [{ value: "foobar" }, { value: "another" }];

            const screen = render(() => <Autocomplete {...props} inputValue="foobar" />);

            expect(screen.getAllByText("foobar")).toHaveLength(1);
            expect(screen.queryByText("another")).not.toBeInTheDocument();
        });
    });
});
