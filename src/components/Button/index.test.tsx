import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Button } from ".";

describe("<Button />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Button>Hi</Button>);
        expect(container).toMatchSnapshot();
    });

    it("loading works", () => {
        const screen = render(() => <Button loading data-testid="button" />);
        expect(screen.getByTestId("button")).toBeDisabled();
    });

    it("icons show up", () => {
        const screen = render(() => (
            <Button leftIcon={<div>left</div>} rightIcon={<div>right</div>} />
        ));

        expect(screen.getByText("left")).toBeInTheDocument();
        expect(screen.getByText("right")).toBeInTheDocument();
    });
});
