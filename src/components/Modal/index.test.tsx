import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, it, vi } from "vitest";

import { Modal } from ".";

describe("<Modal />", () => {
    it("renders correctly", () => {
        const { baseElement } = render(() => (
            <Modal open setOpen={vi.fn()}>
                oh
            </Modal>
        ));

        expect(baseElement).toMatchSnapshot();
    });

    it("opening / closing works", async () => {
        const [open, setOpen] = createSignal(false);

        render(() => (
            <Modal open={open()} setOpen={setOpen}>
                foo
            </Modal>
        ));

        expect(document.querySelector("input")).not.toBeChecked();

        setOpen(true);

        expect(document.querySelector("input")).toBeChecked();

        await userEvent.click(document.querySelector('[data-testid="modal-x"]')!);

        expect(document.querySelector("input")).not.toBeChecked();
    });
});
