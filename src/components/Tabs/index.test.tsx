/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it, vi } from "vitest";

import { Tab, Tabs } from ".";

describe("<Tabs />", () => {
    it("renders correctly", () => {
        const { container } = render(() => (
            <Tabs selected="" setSelected={vi.fn()}>
                <Tab value="foo">foo</Tab>
            </Tabs>
        ));

        expect(container).toMatchSnapshot();
    });

    it("controlled input works", async () => {
        const [selected, setSelected] = createSignal("");

        const screen = render(() => (
            <Tabs selected={selected()} setSelected={setSelected}>
                <Tab value="foo">foo</Tab>
                <Tab value="bar">bar</Tab>
            </Tabs>
        ));

        await userEvent.click(screen.getByText("foo"));

        expect(screen.getByText("foo")).toHaveClass("tab-active");
        expect(selected()).toBe("foo");

        setSelected("bar");
        expect(screen.getByText("foo")).not.toHaveClass("tab-active");
        expect(screen.getByText("bar")).toHaveClass("tab-active");
    });
});
