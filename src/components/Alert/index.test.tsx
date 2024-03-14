import { render } from "@solidjs/testing-library";
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
});
