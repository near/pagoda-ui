# Text

```tsx
import { Text } from '@near-pagoda/ui';

...

<Text>My Text</Text>
<Text color="violet8" weight={600}>My Text</Text>
<Text size="text-xs">My Text</Text>
<Text as="h1">My Text</Text>
<Text as="h2" size="text-s" color="red8">My Text</Text>
```

## Line Clamp

```tsx
<Text clampLines={2}>This is some super duper long text that will be clamped to two lines dynamically.</Text>
```
