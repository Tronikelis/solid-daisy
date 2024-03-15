import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Divider } from ".";

describe("<Divider />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Divider />);
        expect(container).toMatchSnapshot();
    });
});
