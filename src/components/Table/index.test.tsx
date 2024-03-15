import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Table } from ".";

describe("<Table />", () => {
    it("renders correctly", () => {
        const { container } = render(() => (
            <Table>
                <div>foo</div>
            </Table>
        ));

        expect(container).toMatchSnapshot();
    });
});
