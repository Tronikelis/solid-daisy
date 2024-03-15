import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "solid-js";
import { beforeEach, describe, expect, it } from "vitest";

import { Alert } from ".";

describe("<Alert />", () => {
    let props: ComponentProps<typeof Alert>;

    beforeEach(() => {
        props = {
            children: "foo",
        };
    });

    it("renders correctly", () => {
        const { container } = render(() => <Alert {...props} />);
        expect(container).toMatchSnapshot();
    });

    it("renders icon", () => {
        const screen = render(() => <Alert {...props} icon={<div>icon</div>} />);

        expect(screen.getByText("icon")).toBeInTheDocument();
    });

    it("closes itself after pressing x", async () => {
        const screen = render(() => <Alert {...props} />);

        expect(screen.getByText("foo")).toBeInTheDocument();

        await userEvent.click(screen.getByText("✕"));

        expect(screen.queryByText("foo")).not.toBeInTheDocument();
    });
});
