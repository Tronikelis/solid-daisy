import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Stack } from ".";

describe("<Stack />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Stack>foo</Stack>);
        expect(container).toMatchSnapshot();
    });
});
