# Grid

This component helps solve common grid layout requirements. If you need a more sophisticated layout for your use case, consider creating a custom component with its own set of styles.

https://css-tricks.com/snippets/css/complete-guide-grid/

```tsx
import { Grid } from '@pagoda/ui/src/components/Grid';
import { Card } from '@pagoda/ui/src/components/Card';

...

<Grid columns="1fr 1fr">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
  <Card>Card 4</Card>
</Grid>

<Grid columns="1fr 200px" align="center" justify="end" gap="xl">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
  <Card>Card 4</Card>
</Grid>
```

## Breakpoint Adjustments

Sometimes you need to apply adjustments to the layout based on certain screen sizes.

### Columns

Switch the defined `columns` when the screen is small enough to be considered a `tablet` or `phone`:

```tsx
<Grid columns="1fr 1fr 200px 100px" columnsTablet="1fr 1fr" columnsPhone="1fr">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
  <Card>Card 4</Card>
</Grid>
```

### Gap

Switch the `gap` value when the screen is small enough to be considered a `tablet` or `phone`:

```tsx
<Grid gap="xl" gapTablet="l" gapPhone="m">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
</Grid>
```

## Width Overflow Issues

Sometimes you can end up having children inside your grid that want to expand to a point that would cause horizontal overflow. This can tend to happen more commonly when using `fr` units for a column. One option is to ignore the minimum size of the child by using the `minmax(0, 1fr)` syntax for the problematic column.

```tsx
<Grid columns="200px 1fr minmax(0, 1fr)">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3 is really wide and wants to cause horizontal overflow</Card>
</Grid>
```

You can also look into using the `fit-content()` and `clamp()` grid properties.
