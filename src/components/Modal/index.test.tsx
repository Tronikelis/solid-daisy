import { render } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { describe, expect, it, vi } from "vitest";

import { Modal } from ".";

describe("<Modal />", () => {
    it("renders correctly", () => {
        const { container } = render(() => (
            <Modal open setOpen={vi.fn()}>
                oh
            </Modal>
        ));

        expect(container).toMatchSnapshot();
    });

    it("opening / closing works", () => {
        const [open, setOpen] = createSignal(false);

        render(() => (
            <Modal open={open()} setOpen={setOpen}>
                foo
            </Modal>
        ));

        expect(document.querySelector("input")).not.toBeChecked();

        setOpen(true);

        expect(document.querySelector("input")).toBeChecked();
    });
});
