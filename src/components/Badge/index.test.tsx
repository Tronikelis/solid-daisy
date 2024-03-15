import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Badge } from ".";

describe("<Badge />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Badge>What's up</Badge>);
        expect(container).toMatchSnapshot();
    });
});
