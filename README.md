# solid-daisy

-   [solid-daisy](#solid-daisy)
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

### Accordion

```tsx
import { Accordion, AccordionItem } from "solid-daisy"

<Accordion
    joined={false || undefined}
    selected={"value" || undefined}
    setSelected={setValue || undefined}
>
    <AccordionItem value="value" title="title">
        Opened contents
    </AccordionItem>
</Accordion>
```

### Alert

```tsx
import { Alert } from "solid-daisy"

<Alert
    color={"info" || "success" || "error" || "warning" || undefined}
    icon={<IconPhone /> || undefined}
>
    Contents
</Alert>
```

### Autocomplete

```tsx
import { Autocomplete } from "solid-daisy"

<Autocomplete
    value={selectedArr}
    setValue={setSelectedArr}
    multiple={false || undefined}
    inputValue={inputValue || undefined}
    setInputValue={setInputValue || undefined}
    items={itemsArr}
    filter={((item, inputValue) => true) || undefined}
    listComponent={((item) => <div>{item}</div>) || undefined}
    selectedComponent={((item, onDeleteItem) => (
        <div>
            <span onClick={onDeleteItem}>x</span>
            {item}
        </div>
    )) || undefined}
    closeOnSelect={false || undefined}
/>
```

### Avatar

```tsx
import { Avatar } from "solid-daisy"

<Avatar
    size={"xs" || "sm" || "md" || "lg" || undefined}
    src={"https://cdn.com/img.png" || undefined}
/>
```

### Badge

```tsx
import { Badge } from "solid-daisy"

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
</Badge>

```

### Breadcrumbs

```tsx
import { Breadcrumbs, BreadcrumbsItem } from "solid-daisy"

<Breadcrumbs>
    <BreadcrumbsItem>
        Contents
    </BreadcrumbsItem>
</Breadcrumbs>
```

### Button

```tsx
import { Button } from "solid-daisy"

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
</Button>
```

### Card

```tsx
import { Card } from "solid-daisy"

<Card
    withShadow={true || undefined}
    bordered={true || undefined}
    compact={false || undefined}
>
    Contents
</Card>
```

### Checkbox

```tsx
import { Checkbox } from "solid-daisy"

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
/>
```

### Divider

```tsx
import { Divider } from "solid-daisy"

<Divider
    vertical={false || undefined}
/>
```

### Dropdown

```tsx
import { Dropdown } from "solid-daisy"

<Dropdown
    targetRef={node.value}
    fullWidth={false || undefined}
    placement={placement || undefined}
    offset={6 || undefined}
    hover={false || undefined}
    opened={false || undefined}
>
    Contents
</Dropdown>
```

### Group

```tsx
import { Group } from "solid-daisy"

<Group>
    Contents
</Group>
```

### Image

```tsx
import { Image } from "solid-daisy"

<Image />
```

### Input

```tsx
import { Input } from "solid-daisy"

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
/>
```

### Link

```tsx
import { Link } from "solid-daisy"

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
</Link>
```

### Loading

```tsx
import { Loading } from "solid-daisy"

<Loading
    size={"xs" || "sm" || "md" || "lg" || undefined}
/>
```

### Modal

```tsx
import { Modal } from "solid-daisy"

<Modal
    open={open()}
    setOpen={setOpen}

>
    Contents
</Modal>
```

### Pagination

```tsx
import { Pagination } from "solid-daisy"

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
/>
```

### Radio

```tsx
import { Radio, RadioItem } from "solid-daisy"

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
</Radio>
```

### Stack

```tsx
import { Stack } from "solid-daisy"

<Stack>
    Contents
</Stack>
```

### Table

```tsx
import { Table } from "solid-daisy"

<Table
    striped={false || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    stickyHead={false || undefined}
>
    <thead></thead>
    <tbody></tbody>
</Table>
```

### Tabs

```tsx
import { Tabs, Tab } from "solid-daisy"

<Tabs
    variant={"boxed" || "lifted" || "bordered" || undefined}
    size={"xs" || "sm" || "md" || "lg" || undefined}
    selected={selected()}
    setSelected={setSelected}
>
    <Tab value="x">Contents</Tab>
</Tabs>
```

### Text

```tsx
import { Text } from "solid-daisy"

<Text
    dimmed={false || undefined}
    italic={false || undefined}
    bold={false || undefined}
    size={
        "xs" ||
        "sm" ||
        "md" ||
        "lg" ||
        "xl" ||
        "xl2" ||
        "xl4" ||
        undefined
    }
    centered={false || undefined}
    underlined={false || undefined}
    breakWords={false || undefined}
>
    Contents
</Text>
```

### Textarea

```tsx
import { Textarea } from "solid-daisy"

<Textarea
    label={"label" || undefined}
    description={"description" || undefined}
    wrapperProps={{} || undefined}
/>
```

### Toggle

```tsx
import { Toggle } from "solid-daisy"

<Toggle
    label={"label" || undefined}
    wrapperProps={{} || undefined}
/>
```

### Tooltip

```tsx
import { Tooltip } from "solid-daisy"

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
</Tooltip>
```
