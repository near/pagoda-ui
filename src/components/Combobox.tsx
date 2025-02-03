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

export type ComboboxItem = {
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
  items: ComboboxItem[];
  label: string;
  maxDropdownHeight?: string;
  name: string;
  noneLabel?: string;
  onBlur?: (event: any) => void;
  onChange: (value: string | null) => any;
  onCreateItem?: (inputText: string) => any;
  onEditItem?: (selectedItemValue: string) => any;
  placeholder?: string;
  style?: CSSProperties;
  success?: string;
  value: string | null | undefined;
};

export const Combobox = forwardRef<HTMLInputElement, Props>(
  ({ allowCustomInput, allowNone, noneLabel, ...props }, ref) => {
    const noneItem = useMemo(() => {
      const item: ComboboxItem = { label: noneLabel || 'None', value: '__NONE__' };
      return item;
    }, [noneLabel]);

    const inputValue = useRef<string>('');
    const internalCurrentValue = useRef<string | null | undefined>(undefined);
    const internalCurrentValueBeforeFocus = useRef<string | null | undefined>(undefined);
    const onBlurTimeout = useRef<NodeJS.Timeout>();
    const [filteredItems, setFilteredItems] = useState(allowNone ? [noneItem, ...props.items] : props.items);
    const defaultSelectedItem = props.items.find((item) => item.value === props.value);
    const forceOverrideClosed = allowCustomInput && filteredItems.length === 0;
    const debouncedItems = useDebouncedValue(props.items, 25); // This debounce avoids race condition where prop.items updates before props.value

    const { selectItem, setInputValue, ...combobox } = useCombobox({
      id: props.name,
      defaultSelectedItem,
      items: filteredItems,
      itemToString(item) {
        return item ? (item.label ?? item.value.toString()) : '';
      },
      onInputValueChange(event) {
        const query = event.inputValue?.toLowerCase() ?? '';
        const items = allowNone ? [noneItem, ...props.items] : props.items;
        const results = items.filter((item) => {
          if (item.hidden) return false;
          const label = (item.label ?? item.value).toString().toLowerCase();
          return label.includes(query);
        });
        setFilteredItems(results);

        if (allowCustomInput) {
          props.onChange(event.inputValue || internalCurrentValueBeforeFocus.current || '');
          console.log('onInputValueChange', event.inputValue ?? '');
        }
      },
      onSelectedItemChange(event) {
        console.log('onSelectedItemChange', event);

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
      const items = allowNone ? [noneItem, ...props.items] : props.items;
      setFilteredItems(items.filter((item) => !item.hidden));
    }, [allowNone, noneItem, props.items]);

    useEffect(() => {
      const selected = debouncedItems.find((item) => item.value === props.value);

      if (props.value !== internalCurrentValue.current) {
        if (props.value === null && allowNone) {
          internalCurrentValue.current = null;
          selectItem(noneItem);
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
        setInputValue(selected?.label ?? selected?.value.toString() ?? ''); // In the case of the selected item's label being updated, we need to update the input
      }
    }, [allowCustomInput, allowNone, noneItem, selectItem, props.value, debouncedItems, setInputValue]);

    const shouldRenderGroupLabel = (item: ComboboxItem, index: number) => {
      const previousItem = filteredItems[Math.max(0, index - 1)];
      if (item.group && index === 0) return true;
      return item.group && item.group !== previousItem?.group;
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

                  {filteredItems.map((item, index) => (
                    <Fragment key={item.value}>
                      {shouldRenderGroupLabel(item, index) && (
                        <li className={s.dropdownGroupLabel}>
                          <Text as="h5">{item.group}</Text>
                        </li>
                      )}

                      <li
                        className={s.dropdownItem}
                        data-highlighted={combobox.highlightedIndex === index}
                        data-selected={combobox.selectedItem?.value === item.value}
                        {...combobox.getItemProps({ item, index })}
                      >
                        {combobox.selectedItem?.value === item.value ? (
                          <SvgIcon icon={<CheckCircle weight="duotone" />} color="green-9" />
                        ) : (
                          <SvgIcon icon={<Circle weight="duotone" />} color="sand-10" />
                        )}

                        {item.label ?? item.value}
                      </li>
                    </Fragment>
                  ))}

                  {filteredItems.length === 0 && (
                    <li className={s.content}>
                      <Text size="text-s">
                        {props.items.length === 0
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

export function useComboboxItemMapper<T extends unknown[]>(
  array: T | undefined,
  mapItem: (item: T[number]) => ComboboxItem | ComboboxItem[] | null,
  dependencies?: unknown[],
) {
  const options = useMemo(() => {
    return (array?.flatMap(mapItem) ?? []).filter((value) => !!value) as ComboboxItem[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array, ...(dependencies ?? [])]);

  return options;
}
