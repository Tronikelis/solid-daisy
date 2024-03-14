import { render, screen } from "@solidjs/testing-library";
import { ComponentProps } from "solid-js";
import { describe, expect, it } from "vitest";

import { Alert } from ".";

describe("<Alert />", () => {
    const getProps = (
        props?: Partial<ComponentProps<typeof Alert>>
    ): ComponentProps<typeof Alert> => ({
        children: "Foo",
        ...props,
    });

    it("renders correctly", () => {
        const { container } = render(() => <Alert {...getProps()} />);
        expect(container).toMatchSnapshot();
    });

    it("renders icon", () => {
        render(() => <Alert {...getProps()} icon={<div>icon</div>} />);

        expect(screen.getByText("icon")).toBeInTheDocument();
    });
});
