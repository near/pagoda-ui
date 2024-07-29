# Flex

This component helps solve common flex layout requirements. If you need a more sophisticated layout for your use case, consider creating a custom component with its own set of styles.

https://css-tricks.com/snippets/css/a-guide-to-flexbox/

```tsx
import { Flex, Text } from '@near-pagoda/ui';

...

<Flex align="center">
  <Text size="text-xl">Large</Text>
  <Text size="text-s">Small</Text>
</Flex>

<Flex justify="end">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>

<Flex stack gap="l">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>
```

## As

By default, `flex` renders a wrapping `<div>` tag. You can instead adjust it to be a `<label>` or `<span>` tag:

```tsx
<Flex as="label">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>

<Flex as="span">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>
```

## Breakpoint Adjustments

Sometimes you need to apply adjustments to the layout based on certain screen sizes.

### Stack

Switch to a `stack` layout when the screen is small enough to be considered a `tablet` or `phone`:

```tsx
<Flex stack="tablet">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>

<Flex stack="phone">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>
```

### Gap

Switch the `gap` value when the screen is small enough to be considered a `tablet` or `phone`:

```tsx
<Flex gap="xl" gapTablet="l" gapPhone="m">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Flex>
```

## Wrap

When `wrap` is enabled, items will wrap to the next line if there's not enough room to display everything on one row:

```tsx
<Flex wrap>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
  <Text>Item 4</Text>
</Flex>
```
