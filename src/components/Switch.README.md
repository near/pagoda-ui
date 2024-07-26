# Switch

Implemented via Radix primitives: https://www.radix-ui.com/docs/primitives/components/switch

## No Label

If you don't want to display a label alongside the switch, use an `aria-label` attribute to describe the switch:

```tsx
import { Switch } from '@pagoda/ui/src/components/Switch';

...

<Switch aria-label="Turbo Mode" />
```

## With a Label

If you wrap the switch with a `<label>` HTML tag, you don't need to use `aria-label`:

```tsx
import { Flex } from '@pagoda/ui/src/components/Flex';
import { Switch } from '@pagoda/ui/src/components/Switch';

...

<Flex as="label" align="center">
  <Switch />
  Turbo Mode (Label On Right)
</Flex>

<Flex as="label" align="center">
  Turbo Mode (Label On Left)
  <Switch />
</Flex>
```

## With an Icon

```tsx
import { Switch } from '@pagoda/ui/src/components/Switch';
import { Moon, Sun } from '@phosphor-icons/react';

...

<Switch aria-label="Dark Mode" iconOn={<Moon weight="bold" />} iconOff={<Sun weight="bold" />} />
```

## Debounce

Sometimes it makes sense to debounce a switch toggle change event. We can allow a user to visually toggle the switch rapidly, but only respond to the change event once by using the `useDebouncedValue()` hook.

```tsx
import { Switch } from '@pagoda/ui/src/components/Switch';
import { useDebouncedValue } from '@pagoda/ui/src/hooks/debounce';
import { useEffect, useState } from 'react';

...

const [switchValue, setSwitchValue] = useState(false);
const debouncedSwitchValue = useDebouncedValue(switchValue, 300);

useEffect(() => {
  // ...
}, [debouncedSwitchValue]);


...

<Switch aria-label="My Toggle" checked={switchValue} onCheckedChange={setSwitchValue} />
```
