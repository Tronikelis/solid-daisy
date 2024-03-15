import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Tooltip } from ".";

describe("<Tooltip />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Tooltip label="foo">bar</Tooltip>);
        expect(container).toMatchSnapshot();
    });
});
