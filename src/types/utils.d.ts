import { ComponentProps, JSX, ValidComponent } from "solid-js";

export type ForbidChildren<T = Record<string, never>> = Omit<T, "children"> & {
    children?: undefined;
};

export type RequireChildren<T = Record<string, never>> = Omit<T, "children"> & {
    children: JSX.Element;
};

export type MaybeChildren<T = Record<string, never>> = Omit<T, "children"> & {
    children?: JSX.Element;
};

export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object | undefined
          ? RecursivePartial<T[P]>
          : T[P];
};

export type FlattenTuple<T extends any[]> = T extends [infer U, ...infer Rest]
    ? U & FlattenTuple<Rest>
    : NonNullable<unknown>;

export type PropsWith<Base, From extends any[] = Record<string, never>[]> = Base &
    Omit<FlattenTuple<From>, keyof Base>;

export type WrapperProps<T extends ValidComponent> = ForbidChildren<ComponentProps<T>>;

export type MiniSetter<T> = (arg: T) => void;

export type MaybeAccessor<T> = T | (() => T);
