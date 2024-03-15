import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Loading } from ".";

describe("<Loading />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Loading />);
        expect(container).toMatchSnapshot();
    });
});
