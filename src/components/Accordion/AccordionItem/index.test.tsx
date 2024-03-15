import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { AccordionItem } from ".";

describe("<AccordionItem />", () => {
    it("throws if rendered not under context", () => {
        const throws = () => {
            render(() => <AccordionItem>C</AccordionItem>);
        };

        expect(throws).toThrow();
    });
});
