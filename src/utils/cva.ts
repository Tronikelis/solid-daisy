import { cva as _cva, cx as _cx, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export type CvaProps<T extends (...args: any) => any> = VariantProps<T>;

export const cva: typeof _cva = (...parameters) => {
    const withParams = _cva(...parameters);
    return props => twMerge(withParams(props));
};

export const cx: typeof _cx = (...inputs) => twMerge(_cx(...inputs));
