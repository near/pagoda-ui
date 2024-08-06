# FileInput

```tsx
import { FileInput } from '@near-pagoda/ui';

...

const [error, setError] = useState("");
const [disabled, setDisabled] = useState(false);

...

<FileInput
  label="Artwork"
  name="artwork"
  accept="image/*"
  error={error}
  disabled={disabled}
  multiple
  onChange={(fileList) => console.log(fileList)}
/>
```


## React Hook Form

```tsx
import { FileInput } from '@near-pagoda/ui';
import { Controller, useForm } from 'react-hook-form';

type FormSchema = {
  artwork: FileList;
};

...


const form = useForm<FormSchema>();

...

<Controller
  control={form.control}
  name="artwork"
  rules={{
    required: 'Please select an image',
  }}
  render={({ field, fieldState }) => (
    <FileInput label="Event Artwork" accept="image/*" error={fieldState.error?.message} {...field} />
  )}
/>
```
