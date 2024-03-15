import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Card } from ".";

describe("<Card />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Card>Foo</Card>);
        expect(container).toMatchSnapshot();
    });
});
