import { CaretDown, CheckCircle, Circle } from '@phosphor-icons/react';
import { useCombobox } from 'downshift';
import type {
  CSSProperties,
  FocusEventHandler,
  FormEventHandler,
  HTMLInputAutoCompleteAttribute,
  ReactElement,
} from 'react';
import { Fragment, useMemo, useRef } from 'react';
import { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { mergeRefs } from '../helpers/merge-refs';
import { useDebouncedValue } from '../hooks/debounce';
import s from './Combobox.module.scss';
import { Input } from './Input';
import { SvgIcon } from './SvgIcon';
import { Text } from './Text';

export type ComboboxOption = {
  group?: string;
  hidden?: boolean;
  label?: string;
  value: string;
};

type Props = {
  allowCustomInput?: boolean;
  allowNone?: boolean;
  assistive?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute; // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  error?: string;
  icon?: ReactElement;
  infoText?: string;
  /**
   * @deprecated please use "options" prop instead
   */
  items?: ComboboxOption[];
  label: string;
  maxDropdownHeight?: string;
  name: string;
  noneLabel?: string;
  onBlur?: (event: any) => void;
  onChange: (value: string | null) => any;
  onCreateItem?: (inputText: string) => any;
  onEditItem?: (selectedItemValue: string) => any;
  options: ComboboxOption[];
  placeholder?: string;
  style?: CSSProperties;
  success?: string;
  value: string | null | undefined;
};

export const Combobox = forwardRef<HTMLInputElement, Props>(
  ({ allowCustomInput, allowNone, noneLabel, ...props }, ref) => {
    if (props.items) {
      props.options = props.items;
    }

    const noneOption = useMemo(() => {
      const option: ComboboxOption = { label: noneLabel || 'None', value: '__NONE__' };
      return option;
    }, [noneLabel]);

    const inputValue = useRef<string>('');
    const internalCurrentValue = useRef<string | null | undefined>(undefined);
    const internalCurrentValueBeforeFocus = useRef<string | null | undefined>(undefined);
    const onBlurTimeout = useRef<NodeJS.Timeout>();
    const [filteredOptions, setFilteredItems] = useState(allowNone ? [noneOption, ...props.options] : props.options);
    const defaultSelectedItem = props.options.find((o) => o.value === props.value);
    const forceOverrideClosed = allowCustomInput && filteredOptions.length === 0;
    const debouncedOptions = useDebouncedValue(props.options, 25); // This debounce avoids race condition where prop.items updates before props.value

    const { selectItem, setInputValue, ...combobox } = useCombobox({
      id: props.name,
      defaultSelectedItem,
      items: filteredOptions,
      itemToString(item) {
        return item ? (item.label ?? item.value.toString()) : '';
      },
      onInputValueChange(event) {
        const query = event.inputValue?.toLowerCase() ?? '';
        const options = allowNone ? [noneOption, ...props.options] : props.options;

        const results = options.filter((o) => {
          if (o.hidden) return false;
          const label = (o.label ?? o.value).toString().toLowerCase();
          return label.includes(query);
        });

        setFilteredItems(results);

        if (allowCustomInput && event.inputValue) {
          const selected = results.find((option) => (option.label || option.value) === event.inputValue);
          if (selected) {
            if (selected.value !== props.value) {
              props.onChange(selected.value);
            }
          } else {
            if (event.selectedItem) {
              selectItem(null);
            }
            props.onChange(event.inputValue);
          }
        }
      },
      onSelectedItemChange(event) {
        const newValue = event.selectedItem?.value === '__NONE__' ? null : (event.selectedItem?.value ?? null);
        internalCurrentValue.current = newValue;

        // Do nothing if we're simply syncing with outside form state (this prevents us from prematurely marking a form as dirty):
        if (event.type === '__function_select_item__') return;

        if (newValue === null) {
          props.onChange(null);
        } else {
          props.onChange(newValue);
        }
      },
    });

    const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      if (allowCustomInput) {
        if (!event.target.value) {
          setInputValue(internalCurrentValueBeforeFocus.current?.toString() ?? '');
        }
      } else {
        setInputValue(combobox.selectedItem?.label ?? combobox.selectedItem?.value.toString() ?? '');
      }

      props.onBlur && props.onBlur(event);

      onBlurTimeout.current = setTimeout(() => {
        const comboboxOnBlur = combobox.getInputProps().onBlur;
        comboboxOnBlur && comboboxOnBlur(event);
      }, 100);
    };

    const onInput: FormEventHandler<HTMLInputElement> = (event) => {
      inputValue.current = (event.target as HTMLInputElement).value;
      const comboboxOnInput = combobox.getInputProps().onInput;
      comboboxOnInput && comboboxOnInput(event);
    };

    const onFocus: FocusEventHandler<HTMLInputElement> = () => {
      internalCurrentValueBeforeFocus.current = combobox.getInputProps().value;

      clearTimeout(onBlurTimeout.current);

      setInputValue('');

      if (!combobox.isOpen) {
        combobox.openMenu();
      }
    };

    const comboboxInputRef = (combobox.getInputProps() as any).ref; // This value actually exists, the types are wrong

    useEffect(() => {
      const options = allowNone ? [noneOption, ...props.options] : props.options;
      setFilteredItems(options.filter((o) => !o.hidden));
    }, [allowNone, noneOption, props.options]);

    useEffect(() => {
      const selected = debouncedOptions.find((o) => o.value === props.value);

      if (props.value !== internalCurrentValue.current) {
        if (props.value === null && allowNone) {
          internalCurrentValue.current = null;
          selectItem(noneOption);
        } else {
          if (selected) {
            internalCurrentValue.current = selected.value;
            selectItem(selected);
          } else if (allowCustomInput) {
            internalCurrentValue.current = props.value;
            setInputValue(props.value?.toString() ?? '');
          } else {
            internalCurrentValue.current = null;
            selectItem(null);
          }
        }
      } else if (props.value !== null) {
        setInputValue(selected?.label ?? selected?.value.toString() ?? ''); // In the case of the selected option's label being updated, we need to update the input
      }
    }, [allowCustomInput, allowNone, noneOption, selectItem, props.value, debouncedOptions, setInputValue]);

    const shouldRenderGroupLabel = (option: ComboboxOption, index: number) => {
      const previousItem = filteredOptions[Math.max(0, index - 1)];
      if (option.group && index === 0) return true;
      return option.group && option.group !== previousItem?.group;
    };

    return (
      <div
        className={s.wrapper}
        data-open={combobox.isOpen && !forceOverrideClosed}
        style={props.style}
        data-grow={typeof props.style?.width === 'undefined'}
      >
        <div className={s.innerWrapper}>
          <Input
            {...combobox.getInputProps()}
            assistive={props.assistive}
            error={props.error}
            iconLeft={props.icon}
            label={props.label}
            name={props.name}
            autoComplete={props.autoComplete}
            onBlur={onBlur}
            onClick={() => {}} // Ignore this library change: https://github.com/downshift-js/downshift/blob/master/src/hooks/MIGRATION_V8.md#usecombobox-input-click
            onFocus={onFocus}
            onInput={onInput}
            placeholder={props.placeholder}
            ref={mergeRefs([ref, comboboxInputRef])}
            right={
              <>
                <button type="button" className={s.toggleButton} {...combobox.getToggleButtonProps()}>
                  <SvgIcon icon={<CaretDown weight="bold" />} />
                </button>

                <ul className={s.dropdown} {...combobox.getMenuProps()} style={{ maxHeight: props.maxDropdownHeight }}>
                  {props.infoText && (
                    <li className={s.infoText}>
                      <Text size="text-s">{props.infoText}</Text>
                    </li>
                  )}

                  {filteredOptions.map((option, index) => (
                    <Fragment key={option.value}>
                      {shouldRenderGroupLabel(option, index) && (
                        <li className={s.dropdownGroupLabel}>
                          <Text as="h5">{option.group}</Text>
                        </li>
                      )}

                      <li
                        className={s.dropdownItem}
                        data-highlighted={combobox.highlightedIndex === index}
                        data-selected={combobox.selectedItem?.value === option.value}
                        {...combobox.getItemProps({ item: option, index })}
                      >
                        {combobox.selectedItem?.value === option.value ? (
                          <SvgIcon icon={<CheckCircle weight="duotone" />} color="green-9" />
                        ) : (
                          <SvgIcon icon={<Circle weight="duotone" />} color="sand-10" />
                        )}

                        {option.label ?? option.value}
                      </li>
                    </Fragment>
                  ))}

                  {filteredOptions.length === 0 && (
                    <li className={s.content}>
                      <Text size="text-s">
                        {props.options.length === 0
                          ? 'No available options.'
                          : 'No matching options. Try a different search?'}
                      </Text>
                    </li>
                  )}
                </ul>
              </>
            }
            success={props.success}
          />
        </div>
      </div>
    );
  },
);
Combobox.displayName = 'Combobox';

export function useComboboxOptionMapper<T extends unknown[]>(
  array: T | undefined,
  mapper: (item: T[number]) => ComboboxOption | ComboboxOption[] | null,
  dependencies?: unknown[],
) {
  const options = useMemo(() => {
    return (array?.flatMap(mapper) ?? []).filter((value) => !!value) as ComboboxOption[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array, ...(dependencies ?? [])]);

  return options;
}
