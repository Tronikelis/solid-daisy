# solid-daisy

-   [solid-daisy](#solid-daisy)
    -   [Components](#components)
        -   [Accordion](#accordion)
        -   [Alert](#alert)
        -   [Autocomplete](#autocomplete)
        -   [Avatar](#avatar)
        -   [Badge](#badge)
        -   [Breadcrumbs](#breadcrumbs)
        -   [Button](#button)
        -   [Card](#card)

## Components

-   Accordion
-   Alert
-   Autocomplete
-   Avatar
-   Badge
-   Breadcrumbs
-   Button
-   Card
-   Checkbox
-   Divider
-   Dropdown
-   Group
-   Image
-   Input
-   Link
-   Loading
-   Modal
-   Pagination
-   Radio
-   Stack
-   Table
-   Tabs
-   Text
-   Textarea
-   Toggle
-   Tooltip

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
