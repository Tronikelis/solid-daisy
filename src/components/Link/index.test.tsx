import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Link } from ".";

describe("<Link />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Link>huh</Link>);
        expect(container).toMatchSnapshot();
    });
});
