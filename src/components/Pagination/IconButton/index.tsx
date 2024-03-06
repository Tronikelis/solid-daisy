import { ComponentProps } from "solid-js";

import Button from "~/components/Button";

export default function IconButton(props: ComponentProps<typeof Button>) {
    return <Button square {...props} />;
}
