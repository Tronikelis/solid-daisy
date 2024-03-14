import { fireEvent, render, screen } from "@solidjs/testing-library";
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

    it("selecting accordion item works", () => {
        const [selected, setSelected] = createSignal("a");

        render(() => (
            <Accordion {...props} selected={selected()} setSelected={setSelected}>
                <AccordionItem value="a" title="A">
                    a
                </AccordionItem>
                <AccordionItem value="b" title="B">
                    b
                </AccordionItem>
            </Accordion>
        ));

        fireEvent.click(screen.getByText("B"));

        // eslint-disable-next-line solid/reactivity
        expect(selected()).toBe("b");
    });
});
