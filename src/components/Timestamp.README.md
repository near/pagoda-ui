# Timestamp

This component uses `<NoSsr>` to prevent server side rendering of timestamps - which prevents hydration errors due to the server and client ending up with slightly different outputs.

```tsx
import { Text } from '@pagoda/ui/src/components/Text';
import { Timestamp } from '@pagoda/ui/src/components/Timestamp';

...

<Text>
  My cool date:
  <Timestamp date={new Date()} />
</Text>

```
