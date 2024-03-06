type Ref<T extends HTMLElement> = {
    value: T | undefined;
};

export function useRef<T extends HTMLElement>() {
    const ref: Ref<T> = {
        value: undefined,
    };

    const setter = (el: T) => {
        ref.value = el;
    };

    return [ref, setter] as const;
}
