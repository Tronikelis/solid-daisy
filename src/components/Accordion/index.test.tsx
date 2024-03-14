/* eslint-disable solid/reactivity */
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { ComponentProps, createSignal } from "solid-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Accordion, AccordionItem } from ".";

describe("<Accordion />", () => {
    let props: ComponentProps<typeof Accordion>;

    beforeEach(() => {
        props = {
            selected: "a",
            setSelected: vi.fn(),
            children: "Bar",
        };
    });

    it("renders correctly", () => {
        const { container } = render(() => (
            <Accordion>
                <AccordionItem value="a" title="Foo">
                    Bar
                </AccordionItem>
                <AccordionItem value="b" title="Foo">
                    Bar
                </AccordionItem>
            </Accordion>
        ));
        expect(container).toMatchSnapshot();
    });

    it("selecting accordion item works", async () => {
        const [selected, setSelected] = createSignal("a");

        const screen = render(() => (
            <Accordion {...props} selected={selected()} setSelected={setSelected}>
                <AccordionItem value="a" title="A">
                    a
                </AccordionItem>
                <AccordionItem value="b" title="B">
                    b
                </AccordionItem>
            </Accordion>
        ));

        await userEvent.click(screen.getByText("B"));

        expect(selected()).toBe("b");
    });
});
