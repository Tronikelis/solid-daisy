import { createEventListener } from "@solid-primitives/event-listener";
import { mergeRefs } from "@solid-primitives/refs";
import {
    Accessor,
    ComponentProps,
    createEffect,
    createMemo,
    createSignal,
    createUniqueId,
    For,
    JSX,
    on,
    onMount,
    Setter,
    splitProps,
} from "solid-js";

import { useClickOutside } from "~/hooks";
import { ForbidChildren, MiniSetter, PropsWith } from "~/types";
import { clamp, cx } from "~/utils";

import { Badge, Dropdown, Input, Stack, Text } from "../";

export type ItemLike = {
    value: string;
};

type Props<T extends ItemLike> = PropsWith<
    {
        multiple?: boolean;

        value: T[];
        setValue: MiniSetter<T[]>;

        inputValue?: string;
        setInputValue?: Setter<string>;

        items: T[];

        filter?: (item: T, inputValue: string) => boolean;

        listComponent?: (item: T) => JSX.Element;
        selectedComponent?: (item: T, onDeleteItem: () => void) => JSX.Element;

        closeOnSelect?: boolean;
    },
    [ComponentProps<typeof Input>]
>;

export function Autocomplete<T extends ItemLike>(props: ForbidChildren<Props<T>>) {
    const [local, others] = splitProps(props, [
        "value",
        "setValue",
        "inputValue",
        "setInputValue",
        "items",
        "filter",
        "listComponent",
        "multiple",
        "selectedComponent",
        "closeOnSelect",
        "ref",
    ]);

    const ID_PREFIX = createUniqueId();

    const [_inputValue, _setInputValue] = createSignal("");

    const inputValue = () => local.inputValue || _inputValue();
    const setInputValueAcc = () => local.setInputValue || _setInputValue;

    const [opened, setOpened] = createSignal(false);
    const [navigatingOn, setNavigatingOn] = createSignal(-1);

    const [inputRef, setInputRef] = createSignal<HTMLInputElement>();
    const [dropdownRef, setDropdownRef] = createSignal<HTMLDivElement>();
    const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

    const onInput = (e: { target: HTMLInputElement }) => setInputValueAcc()(e.target.value);
    createEventListener(
        () => inputRef(),
        "input",
        event => onInput(event as unknown as InputEvent & { target: HTMLInputElement })
    );

    const filteredItems = createMemo(() => {
        if (!inputValue()) return local.items;

        const customFilter = local.filter;
        if (customFilter) {
            return local.items.filter(item => customFilter(item, inputValue()));
        }

        return local.items.filter(item =>
            item.value.toLowerCase().includes(inputValue().toLowerCase())
        );
    });

    const itemExists = (value: string) => {
        return !!local.value.find(x => x.value === value);
    };

    const onClickItem = (item: T) => {
        setInputValueAcc()("");

        if (itemExists(item.value)) {
            local.setValue(local.value.filter(x => x.value !== item.value));
            return;
        }

        if (local.closeOnSelect) {
            setOpened(false);
        }

        if (local.multiple) {
            local.setValue([...local.value, item]);
            return;
        }

        local.setValue([item]);
        setOpened(false);
    };

    const onDeleteItem = (value: string) => {
        local.setValue(local.value.filter(x => x.value !== value));
    };

    createEventListener(
        () => inputRef(),
        "focus",
        () => setOpened(true)
    );

    useClickOutside(
        () => [containerRef(), dropdownRef()],
        () => setOpened(false)
    );

    // key events
    onMount(() => {
        const endNavigation = () => setNavigatingOn(-1);
        const clampNavigation = (value: number) => clamp(value, 0, filteredItems().length - 1);

        const scrollToItem = () => {
            document.getElementById(`${ID_PREFIX}${navigatingOn()}`)?.scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "start",
            });
        };

        createEventListener(inputRef(), "keydown", e => {
            if (e.code === "ArrowDown") {
                e.preventDefault();

                setNavigatingOn(x => clampNavigation(x + 1));
                scrollToItem();
            }
            if (e.code === "ArrowUp") {
                e.preventDefault();

                setNavigatingOn(x => clampNavigation(x - 1));
                scrollToItem();
            }

            if (e.code === "Enter" && navigatingOn() >= 0) {
                e.preventDefault();

                const item = filteredItems().at(navigatingOn());
                if (!item) return;

                onClickItem(item);
            }

            if (e.code === "Escape") {
                setOpened(false);
            }
        });

        createEffect(on(opened, endNavigation));
    });

    const renderLeftSection = () =>
        local.value.length > 0 && (
            <For each={local.value}>
                {item => (
                    <>
                        {local.selectedComponent ? (
                            local.selectedComponent(item, () => onDeleteItem(item.value))
                        ) : (
                            <Badge>
                                {local.multiple && (
                                    <Text size="sm" onClick={() => onDeleteItem(item.value)}>
                                        X
                                    </Text>
                                )}

                                {item.value}
                            </Badge>
                        )}
                    </>
                )}
            </For>
        );

    const renderItem = (item: T, index: Accessor<number>) => (
        <button type="button" onClick={() => onClickItem(item)} id={`${ID_PREFIX}${index()}`}>
            <li>
                <Stack
                    class={cx(
                        "h-full w-full [&>*]:h-full [&>*]:w-full",
                        itemExists(item.value) && "active",
                        navigatingOn() === index() && "ring"
                    )}
                >
                    {local.listComponent ? local.listComponent(item) : <a>{item.value}</a>}
                </Stack>
            </li>
        </button>
    );

    return (
        <>
            <Input
                leftSection={renderLeftSection()}
                ref={mergeRefs(local.ref, setInputRef)}
                containerProps={{ ref: setContainerRef }}
                value={inputValue()}
                type="text"
                bordered
                {...others}
            />

            <Dropdown
                class={cx(filteredItems().length < 1 && "invisible")}
                targetRef={containerRef()}
                opened={opened()}
                ref={setDropdownRef}
                fullWidth
                data-testId="dropdown"
            >
                <ul class="menu max-h-48 flex-nowrap gap-1 overflow-auto">
                    <For each={filteredItems()}>{renderItem}</For>
                </ul>
            </Dropdown>
        </>
    );
}
