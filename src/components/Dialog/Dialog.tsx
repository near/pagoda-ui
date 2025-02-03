'use client';

import { X } from '@phosphor-icons/react';
import * as Primitive from '@radix-ui/react-dialog';
import type { ComponentProps, ReactNode } from 'react';
import { forwardRef } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';
import s from './Dialog.module.scss';

export const Root = Primitive.Root;
export const Trigger = Primitive.Trigger;
export const Title = Primitive.Title;

type ContentProps = Omit<ComponentProps<typeof Primitive.Content>, 'title'> & {
  align?: 'center' | 'stretch';
  header?: ReactNode;
  size?: 's' | 'm' | 'l';
  title?: string | null;
  transparentHeader?: boolean;
};

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ align, children, className = '', header, size = 'm', title, transparentHeader, ...props }, ref) => {
    const onPointerDownOutside: ContentProps['onPointerDownOutside'] = (event) => {
      const target = event.target as HTMLElement;
      if (!target.hasAttribute('data-dialog-overlay')) {
        /*
          The dialog should only close if the <Primitive.Overlay /> was clicked.
          Browser extensions like 1Password will overlay fixed DOM elements that 
          live outside the <Primitive.Content /> tree (directly in the <body>). 
          Clicking these extension generated buttons should not close the dialog.
        */
        event.preventDefault();
        return;
      }
      if (props.onPointerDownOutside) {
        props.onPointerDownOutside(event);
      }
    };

    return (
      <Primitive.Portal>
        <Primitive.Overlay className={s.overlay} data-dialog-overlay>
          <Primitive.Content
            className={`${s.content} ${className}`}
            data-align={align}
            data-size={size}
            ref={ref}
            {...props}
            onPointerDownOutside={onPointerDownOutside}
            onSubmit={(event) => {
              /*
              This prevents forms on the parent page from being submitted when a form
              inside the dialog is submitted:
            */
              event.stopPropagation();
            }}
            aria-describedby=""
          >
            <div className={s.header} data-transparent={transparentHeader}>
              <Flex align="center" gap="m" style={{ marginRight: 'auto', flexGrow: 1 }}>
                {title && (
                  <Primitive.Title asChild>
                    <Text size="text-l">{title}</Text>
                  </Primitive.Title>
                )}

                {header}
              </Flex>

              <Primitive.Close asChild>
                <Button
                  label="Close"
                  size="small"
                  variant="secondary"
                  fill={transparentHeader ? 'solid' : 'outline'}
                  icon={<X weight="bold" />}
                />
              </Primitive.Close>
            </div>

            <div className={s.body}>{children}</div>
          </Primitive.Content>
        </Primitive.Overlay>
      </Primitive.Portal>
    );
  },
);
Content.displayName = 'Content';
