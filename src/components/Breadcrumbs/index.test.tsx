import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { Breadcrumbs, BreadcrumbsItem } from ".";

describe("<Breadcrumbs />", () => {
    it("renders correctly", () => {
        const { container } = render(() => (
            <Breadcrumbs>
                <BreadcrumbsItem>Foobar</BreadcrumbsItem>
                <BreadcrumbsItem>BarFoo</BreadcrumbsItem>
            </Breadcrumbs>
        ));

        expect(container).toMatchSnapshot();
    });
});
