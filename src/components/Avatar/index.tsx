import { ComponentProps, splitProps } from "solid-js";

import { ForbidChildren, PropsWith } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

import { Image } from "../";

const avatar = cva("flex-shrink-0 overflow-hidden rounded-full *:aspect-square", {
    variants: {
        size: {
            xs: "size-6",
            sm: "size-8",
            md: "size-16",
            lg: "size-20",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

type Props = PropsWith<
    {
        src: string | undefined;
    },
    [CvaProps<typeof avatar>, ComponentProps<"div">]
>;

export function Avatar(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, ["class", "src", "size"]);

    return (
        <div class={avatar({ class: local.class, size: local.size })} {...others}>
            <Image src={local.src} />
        </div>
    );
}
