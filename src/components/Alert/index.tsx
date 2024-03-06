import { ComponentProps, createSignal, JSX, Show, splitProps } from "solid-js";

import { PropsWith, RequireChildren } from "~/types/utils";
import { cva, CvaProps } from "~/utils/cva";

import Button from "../Button";

const alert = cva("alert", {
    variants: {
        color: {
            info: "alert-info",
            success: "alert-success",
            warning: "alert-warning",
            error: "alert-error",
        },
    },
});

type Props = PropsWith<
    {
        icon?: JSX.Element;
    },
    [CvaProps<typeof alert>, ComponentProps<"div">]
>;

export default function Alert(props: RequireChildren<Props>) {
    const [local, others] = splitProps(props, ["icon", "class", "children", "color"]);

    const [show, setShow] = createSignal(true);

    return (
        <Show when={show()}>
            <div class={alert({ class: local.class, color: local.color })} {...others}>
                {local.icon}
                {local.children}
                <div>
                    <Button size="sm" color="ghost" circle onClick={() => setShow(false)}>
                        {"✕"}
                    </Button>
                </div>
            </div>
        </Show>
    );
}
