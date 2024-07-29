# Dialog

Built with the Radix UI Dialog primitive: https://www.radix-ui.com/primitives/docs/components/dialog

```tsx
import { Dialog } from '@near-pagoda/ui';

...

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button label="Open Dialog" />
  </Dialog.Trigger>

  <Dialog.Content title="My Dialog">
    <Text>Some content here.</Text>
    <Text>More content over there.</Text>
  </Dialog.Content>
</Dialog.Root>
```
