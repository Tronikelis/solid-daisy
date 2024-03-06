import { ComponentProps, splitProps } from "solid-js";

import { ForbidChildren, PropsWith } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

const image = cva("object-fit h-full w-full");

type Props = PropsWith<CvaProps<typeof image>, [ComponentProps<"img">]>;

export default function Image(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, ["class"]);

    return (
        <img
            loading="lazy"
            referrerPolicy="no-referrer"
            class={image({ class: local.class })}
            {...others}
        />
    );
}
