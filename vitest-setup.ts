import { afterEach } from "vitest";
import { cleanup } from "@solidjs/testing-library";

window.HTMLElement.prototype.scrollIntoView = function () {};

afterEach(() => {
    cleanup();
});
