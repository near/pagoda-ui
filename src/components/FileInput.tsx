import { FileArrowUp, Paperclip } from '@phosphor-icons/react';
import type { ChangeEventHandler, ComponentProps, CSSProperties, DragEventHandler, FocusEventHandler } from 'react';
import { forwardRef, useState } from 'react';

import { useDebouncedValue } from '../hooks/debounce';
import { AssistiveText } from './AssistiveText';
import s from './FileInput.module.scss';
import { SvgIcon } from './SvgIcon';
import { Text } from './Text';

type Props = {
  accept: ComponentProps<'input'>['accept'];
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  multiple?: boolean;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (value: FileList | null) => any;
  style?: CSSProperties;
  value?: FileList | null | undefined;
};

export const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ className = '', disabled, label, error, style, name, value, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingDebounced = useDebouncedValue(isDragging, 50);
    const files = [...(value ?? [])];
    const assistiveTextId = `${name}-assistive-text`;

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      props.onChange(event.target.files);
    };

    const onDragLeave: DragEventHandler<HTMLLabelElement> = () => {
      setIsDragging(false);
    };

    const onDragOver: DragEventHandler<HTMLLabelElement> = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const onDrop: DragEventHandler<HTMLLabelElement> = async (event) => {
      event.preventDefault();
      setIsDragging(false);
      props.onChange(event.dataTransfer.files);
    };

    return (
      <label
        className={`${s.wrapper} ${className}`}
        style={style}
        data-dragging={isDraggingDebounced}
        data-disabled={disabled}
        data-error={!!error}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          type="file"
          className={s.nativeInput}
          aria-errormessage={error ? assistiveTextId : undefined}
          aria-invalid={!!error}
          ref={ref}
          name={name}
          disabled={disabled}
          {...props}
          onChange={onChange}
          value={undefined}
        />

        {label && <span className={s.label}>{label}</span>}

        <div className={s.input}>
          {files.length > 0 && (
            <div className={s.files}>
              {files.map((file) => (
                <div className={s.file} key={file.name}>
                  {file.type.includes('image/') && <img src={URL.createObjectURL(file)} alt={file.name} />}

                  <div className={s.filename}>
                    <SvgIcon icon={<Paperclip />} size="xs" color="sand10" />
                    <Text size="text-xs">{file.name}</Text>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={s.cta}>
            <SvgIcon icon={<FileArrowUp />} color="violet8" />
            <Text size="text-s">Select or drag & drop {props.multiple ? 'files' : 'file'}</Text>
          </div>
        </div>

        <AssistiveText variant="error" message={error} id={assistiveTextId} />
      </label>
    );
  },
);

FileInput.displayName = 'FileInput';
