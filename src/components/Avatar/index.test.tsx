import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Avatar } from ".";

describe("<Avatar />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Avatar src="https://example.com" />);
        expect(container).toMatchSnapshot();
    });
});
