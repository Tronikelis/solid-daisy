import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Text } from ".";

describe("<Text />", () => {
    it("renders correctly", () => {
        const { container } = render(() => <Text>foo</Text>);
        expect(container).toMatchSnapshot();
    });
});
