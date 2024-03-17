import { createEventListener } from "@solid-primitives/event-listener";

import { MaybeAccessor } from "~/types";

type CanMany<T> = T | T[];

export function useClickOutside(
    target: MaybeAccessor<CanMany<HTMLElement | undefined>>,
    cb: () => void
) {
    function isInside(el: HTMLElement, eventTarget: Node): boolean {
        return el.contains(eventTarget);
    }

    createEventListener(document, "pointerdown", (event: MouseEvent) => {
        if (event.button !== 0) return;

        let el: CanMany<HTMLElement | undefined>;

        if (typeof target === "function") {
            el = target();
        } else {
            el = target;
        }

        if (el === undefined) {
            console.warn("[useClickOutside]: el was undefined, returning");
            return;
        }

        if (Array.isArray(el) && el.includes(undefined)) {
            console.warn("[useClickOutside]: el was undefined, returning");
            return;
        }

        const inside = Array.isArray(el)
            ? el.some(x => isInside(x!, event.target as Node))
            : isInside(el, event.target as Node);

        if (!inside) {
            cb();
        }
    });
}
