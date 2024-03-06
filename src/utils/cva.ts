import { cva as _cva, cx as _cx, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type OrUndefined<T> = {
    [K in keyof T]: T[K] | undefined;
};

export type CvaProps<T extends (...args: any) => any> = Partial<VariantProps<T>>;

export function cva<T>(...parameters: Parameters<typeof _cva<T>>) {
    type Props = OrUndefined<Required<VariantProps<ReturnType<typeof _cva<T>>>>> & {
        class: string | undefined;
    };

    const withParams = _cva(...parameters);

    return (props: Props) => twMerge(withParams(props as any));
}

export const cx: typeof _cx = (...inputs) => twMerge(_cx(...inputs));
