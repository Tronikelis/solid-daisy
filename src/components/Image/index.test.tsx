import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Image } from ".";

describe("<Image />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Image />);
        expect(container).toMatchSnapshot();
    });
});
