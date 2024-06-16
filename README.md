<h1 align="center">solid-daisy</h1>

<h3 align="center">class-variance-authority + tailwindcss + solid-js + daisyui => 💪</h3>

<div align="center">
    <img src="https://img.shields.io/github/stars/Tronikelis/solid-daisy?style=flat-square" />
    <img src="https://img.shields.io/bundlephobia/minzip/solid-daisy?style=flat-square" />
    <img src="https://img.shields.io/npm/v/solid-daisy?style=flat-square" />
</div>

-   [Install](#install)
-   [Components](#components)
    -   [Accordion](#accordion)
    -   [Alert](#alert)
    -   [Autocomplete](#autocomplete)
    -   [Avatar](#avatar)
    -   [Badge](#badge)
    -   [Breadcrumbs](#breadcrumbs)
    -   [Button](#button)
    -   [Card](#card)
    -   [Checkbox](#checkbox)
    -   [Divider](#divider)
    -   [Dropdown](#dropdown)
    -   [Group](#group)
    -   [Image](#image)
    -   [Input](#input)
    -   [Link](#link)
    -   [Loading](#loading)
    -   [Modal](#modal)
    -   [Pagination](#pagination)
    -   [Radio](#radio)
    -   [Stack](#stack)
    -   [Table](#table)
    -   [Tabs](#tabs)
    -   [Text](#text)
    -   [Textarea](#textarea)
    -   [Toggle](#toggle)
    -   [Tooltip](#tooltip)
-   [Creating your own components](#creating-your-own-components)
-   [A note about nested refs](#a-note-about-nested-refs)
-   [Misc utils](#misc-utils)

## Install

```
pnpm add solid-daisy solid-js tailwindcss @solid-primitives/event-listener @solid-primitives/refs solid-controlled-input daisyui
```

```js
// tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}", "./node_modules/solid-daisy/dist/**/*.{js,ts,jsx,tsx}"],
    plugins: [require("daisyui")],
};
```

```jsonc
// tsconfig.json
{
    // --
    "esModuleInterop": true,
    // --
}
```

## Components

### Accordion

```tsx
import { Accordion, AccordionItem } from "solid-daisy";

<Accordion
    joined={false || undefined}
    selected={"value" || undefined}
    setSelected={setValue || undefined}
>
    <AccordionItem value="value" title="title">
        Opened contents
    </AccordionItem>
</Accordion>;
```

### Alert

```tsx
import { Alert } from "solid-daisy";

<Alert
    color={"info" || "success" || "error" || "warning" || undefined}
    icon={<IconPhone /> || undefined}
>
    Contents
</Alert>;
```

### Autocomplete

```tsx
import { Autocomplete } from "solid-daisy";

<Autocomplete
    value={selectedArr}
    setValue={setSelectedArr}
    multiple={false || undefined}
    inputValue={inputValue || undefined}
    setInputValue={setInputValue || undefined}
    items={itemsArr}
    filter={((item, inputValue) => true) || undefined}
    listComponent={(item => <div>{item}</div>) || undefined}
    selectedComponent={
        ((item, onDeleteItem) => (
            <div>
                <span onClick={onDeleteItem}>x</span>
                {item}
            </div>
        )) || undefined
    }
    closeOnSelect={false || undefined}
/>;
```

### Avatar

```tsx
import { Avatar } from "solid-daisy";

<Avatar
    size={"xs" || "sm" || "md" || "lg" || undefined}
    src={"https://cdn.com/img.png" || undefined}
/>;
```

### Badge

```tsx
import { Badge } from "solid-daisy";

<Badge
    color={
        "neutral" ||
        "primary" ||
        "secondary" ||
        "accent" ||
        "ghost" ||
        "info" ||
        "success" ||
        "warning" ||
        "error" ||
        undefined
    }
    size={"xs" || "sm" || "md" || "lg" || undefined}
    outlined={false || undefined}
>
    Contents
</Badge>;
```

### Breadcrumbs

```tsx
import { Breadcrumbs, BreadcrumbsItem } from "solid-daisy";

<Breadcrumbs>
    <BreadcrumbsItem>Contents</BreadcrumbsItem>
</Breadcrumbs>;
```

### Button

```tsx
import { Button } from "solid-daisy";

<Button
    outlined={false || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    square={false || undefined}
    circle={false || undefined}
    color={
        "neutral" ||
        "primary" ||
        "secondary" ||
        "accent" ||
        "ghost" ||
        "info" ||
        "success" ||
        "warning" ||
        "error" ||
        undefined
    }
    rightIcon={<Icon /> || undefined}
    leftIcon={<Icon /> || undefined}
    loading={false || undefined}
>
    Contents
</Button>;
```

### Card

```tsx
import { Card } from "solid-daisy";

<Card withShadow={true || undefined} bordered={true || undefined} compact={false || undefined}>
    Contents
</Card>;
```

### Checkbox

```tsx
import { Checkbox } from "solid-daisy";

<Checkbox
    label={"label" || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    color={
        "primary" ||
        "secondary" ||
        "accent" ||
        "success" ||
        "warning" ||
        "info" ||
        "error" ||
        undefined
    }
    wrapperProps={{} || undefined}
/>;
```

### Divider

```tsx
import { Divider } from "solid-daisy";

<Divider vertical={false || undefined} />;
```

### Dropdown

```tsx
import { Dropdown } from "solid-daisy";

<Dropdown
    targetRef={node.value}
    fullWidth={false || undefined}
    placement={placement || undefined}
    offset={6 || undefined}
    hover={false || undefined}
    opened={false || undefined}
>
    Contents
</Dropdown>;
```

### Group

```tsx
import { Group } from "solid-daisy";

<Group>Contents</Group>;
```

### Image

```tsx
import { Image } from "solid-daisy";

<Image />;
```

### Input

```tsx
import { Input } from "solid-daisy";

<Input
    bordered={true || undefined}
    disabled={false || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    color={
        "primary" ||
        "secondary" ||
        "accent" ||
        "success" ||
        "warning" ||
        "info" ||
        "error" ||
        undefined
    }
    label={"label" || undefined}
    description={"description" || undefined}
    requiredHtml={false || undefined}
    required={false || undefined}
    leftSection={<Icon /> || undefined}
    rightSection={<Icon /> || undefined}
    wrapperProps={{} || undefined}
    containerProps={{} || undefined}
/>;
```

### Link

```tsx
import { Link } from "solid-daisy";

<Link
    italic={false || undefined}
    bold={false || undefined}
    hover={false || undefined}
    color={
        "primary" ||
        "secondary" ||
        "accent" ||
        "success" ||
        "warning" ||
        "info" ||
        "error" ||
        undefined
    }
>
    Contents
</Link>;
```

### Loading

```tsx
import { Loading } from "solid-daisy";

<Loading size={"xs" || "sm" || "md" || "lg" || undefined} />;
```

### Modal

```tsx
import { Modal } from "solid-daisy";

<Modal open={open()} setOpen={setOpen}>
    Contents
</Modal>;
```

### Pagination

```tsx
import { Pagination } from "solid-daisy";

<Pagination
    total={2 || undefined}
    boundaries={1 || undefined}
    siblings={1 || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    value={page()}
    setValue={setPage}
    leftArrowIcon={<Icon /> || undefined}
    rightArrowIcon={<Icon /> || undefined}
    dotsIcon={<Icon /> || undefined}
/>;
```

### Radio

```tsx
import { Radio, RadioItem } from "solid-daisy";

<Radio
    color={
        "primary" ||
        "secondary" ||
        "accent" ||
        "success" ||
        "warning" ||
        "info" ||
        "error" ||
        undefined
    }
    size={"xs" || "sm" || "md" || "lg" || undefined}
    selected={value() || undefined}
    setSelected={setSelected}
>
    <RadioItem
        size={"xs" || "sm" || "md" || "lg" || undefined}
        color={
            "primary" ||
            "secondary" ||
            "accent" ||
            "success" ||
            "warning" ||
            "info" ||
            "error" ||
            undefined
        }
        value={"value" || undefined}
        label={"label" || undefined}
        wrapperProps={{} || undefined}
    />
</Radio>;
```

### Stack

```tsx
import { Stack } from "solid-daisy";

<Stack>Contents</Stack>;
```

### Table

```tsx
import { Table } from "solid-daisy";

<Table
    striped={false || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    stickyHead={false || undefined}
>
    <thead></thead>
    <tbody></tbody>
</Table>;
```

### Tabs

```tsx
import { Tabs, Tab } from "solid-daisy";

<Tabs
    variant={"boxed" || "lifted" || "bordered" || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    selected={selected()}
    setSelected={setSelected}
>
    <Tab value="x">Contents</Tab>
</Tabs>;
```

### Text

```tsx
import { Text } from "solid-daisy";

<Text
    dimmed={false || undefined}
    italic={false || undefined}
    bold={false || undefined}
    size={"xs" || "sm" || "md" || "lg" || "xl" || "xl2" || "xl4" || undefined}
    centered={false || undefined}
    underlined={false || undefined}
    breakWords={false || undefined}
>
    Contents
</Text>;
```

### Textarea

```tsx
import { Textarea } from "solid-daisy";

<Textarea
    label={"label" || undefined}
    description={"description" || undefined}
    wrapperProps={{} || undefined}
/>;
```

### Toggle

```tsx
import { Toggle } from "solid-daisy";

<Toggle label={"label" || undefined} wrapperProps={{} || undefined} />;
```

### Tooltip

```tsx
import { Tooltip } from "solid-daisy";

<Tooltip
    label={"content"}
    opened={opened() || undefined}
    position={"top" || "bottom" || "left" || "right" || undefined}
    color={
        "primary" ||
        "secondary" ||
        "accent" ||
        "success" ||
        "warning" ||
        "info" ||
        "error" ||
        undefined
    }
>
    Hover me
</Tooltip>;
```

## Creating your own components

Exported utils

-   `cva` -> `class-variance-authority` wrapped with `tailwind-merge`
-   `CvaProps` -> `VariantProps` from `class-variance-authority`
-   `cx` -> `clsx` wrapped with `tailwind-merge`
-   `PropsWith` -> type that helps merge other types

Optional util types

-   `RequireChildren`
-   `ForbidChildren`
-   `MaybeChildren`

Example (CardWithAvatar)

```tsx
import { cva, PropsWith, cx, Card, Avatar, ForbidChildren } from "solid-daisy";
import { ComponentProps, splitProps } from "solid-js";

const cardWithAvatar = cva("base classes", {
    variants: {
        // read class-variance-authority docs
    },
});

type Props = PropsWith<
    {
        hello: string;
    },
    [ComponentProps<typeof Card>]
>;

export function CardWithAvatar(props: ForbidChildren<Props>) {
    const [local, others] = splitProps(props, ["hello", "class"]);

    return (
        <Card
            class={cardWithAvatar({
                class: local.class,
            })}
            {...others}
        >
            <Avatar src={local.hello} />
        </Card>
    );
}
```

## A note about nested refs

Use `createSignal` when assigning refs that are not `ref={}` but a different property

Example

```tsx

let wrapperRef: HTMLDivElement | undefined;

<Input
    // this works, as solid compiles the assign
    ref={wrapperRef}
    // it is impossible for Input to set wrapperRef
    wrapperProps={{ ref: wrapperRef }}
/>

/**
 That's why we do it like this
*/

const [wrapperRef, setWrapperRef] = createSignal<HTMLDivElement>()

// both options work, because setWrapperRef is a setter,
// which solid will call

<Input
    ref={setWrapperRef}
    wrapperProps={{ ref: setWrapperRef }}
/>

// use like
onMount(() => {
    console.log(wrapperRef())
})
```

## Misc utils

This lib exports everything it uses,

A few notable utils

-   `useClickOutside`
