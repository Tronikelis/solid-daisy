import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
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

    it("opening / closing works", async () => {
        const [open, setOpen] = createSignal(false);

        const screen = render(() => (
            <Modal open={open()} setOpen={setOpen}>
                foo
            </Modal>
        ));

        expect(document.querySelector("input")).not.toBeChecked();

        setOpen(true);

        expect(document.querySelector("input")).toBeChecked();

        await userEvent.click(screen.getByText("✕"));

        expect(document.querySelector("input")).not.toBeChecked();
    });
});
