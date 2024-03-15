import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Group } from ".";

describe("<Group />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Group>foo</Group>);
        expect(container).toMatchSnapshot();
    });
});
