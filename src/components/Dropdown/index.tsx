import {
    autoUpdate,
    computePosition,
    flip,
    Middleware,
    offset,
    Placement,
    shift,
    size,
} from "@floating-ui/dom";
import { createEventListener } from "@solid-primitives/event-listener";
import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, createSignal, onCleanup, splitProps } from "solid-js";

import useClickOutside from "~/hooks/useClickOutside";
import useRef from "~/hooks/useRef";
import { MaybeAccessor, PropsWith, RequireChildren } from "~/types/utils";
import { cva, CvaProps, cx } from "~/utils/cva";

const dropdown = cva(
    "fixed left-0 top-0 z-[3000] rounded-box border-2 border-base-200 bg-base-100 opacity-0 shadow transition-opacity duration-200"
);

type Props = PropsWith<
    {
        targetRef: MaybeAccessor<HTMLElement | undefined>;
        fullWidth?: boolean;
        placement?: Placement;
        offset?: number;
        hover?: boolean;

        opened?: boolean;
    },
    [ComponentProps<"div">, CvaProps<typeof dropdown>]
>;

export default function Dropdown(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, [
        "targetRef",
        "fullWidth",
        "children",
        "class",
        "placement",
        "offset",
        "hover",
        "opened",
        "ref",
    ]);

    const [dropdownRef, setDropdownRef] = useRef<HTMLDivElement>();

    const [opened, setOpened] = createSignal(false);

    const getTargetRef = (): HTMLElement | undefined => {
        let ref: HTMLElement | undefined;

        if (typeof local.targetRef === "function") {
            ref = local.targetRef();
        } else {
            ref = local.targetRef;
        }

        return ref;
    };

    createEffect(() => {
        if (local.opened === undefined) return;
        setOpened(local.opened);
    });

    // auto updating dropdown position / size based on target ref
    createEffect(() => {
        if (!opened()) return;

        const targetRef = getTargetRef();
        if (!targetRef) return;

        const fullWidth = local.fullWidth;

        const middleware: Middleware[] = [
            offset(local.offset ?? 6),
            flip(),
            shift({
                padding: (local.offset ?? 6) * 2,
            }),
        ];

        if (fullWidth) {
            middleware.push(
                size({
                    apply: ({ rects }) => {
                        Object.assign(dropdownRef.value!.style, {
                            width: `${rects.reference.width}px`,
                        });
                    },
                })
            );
        }

        const compute = async () => {
            const { x, y } = await computePosition(targetRef, dropdownRef.value!, {
                placement: local.placement,
                middleware,
            });

            Object.assign(dropdownRef.value!.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        };

        const cleanup = autoUpdate(targetRef, dropdownRef.value!, compute);
        onCleanup(cleanup);
    });

    // main state updates here
    createEffect(() => {
        if (local.opened !== undefined) return;

        const targetRef = getTargetRef();
        if (!targetRef) return;

        const show = () => setOpened(true);
        const hide = () => setOpened(false);
        const toggle = () => setOpened(x => !x);

        if (local.hover) {
            createEventListener(targetRef, "mouseenter", show);
            createEventListener(targetRef, "mouseleave", hide);
        }

        createEventListener(targetRef, "click", toggle);
        useClickOutside([dropdownRef.value, targetRef], hide);
    });

    return (
        <div
            ref={mergeRefs(local.ref, setDropdownRef)}
            class={cx(
                dropdown({ class: local.class }),
                opened() ? "visible opacity-100" : "invisible opacity-0"
            )}
            {...others}
        >
            {local.children}
        </div>
    );
}
