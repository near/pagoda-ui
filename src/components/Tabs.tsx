import * as Primitive from '@radix-ui/react-tabs';
import type { ComponentProps, ReactElement } from 'react';
import { forwardRef } from 'react';
import { useEffect, useRef } from 'react';

import { usePagodaUi } from '../context/PagodaUi';
import { mergeRefs } from '../utils/merge-refs';
import s from './Tabs.module.scss';

type RootProps = Omit<ComponentProps<typeof Primitive.Root>, 'size' | 'variant'> & {
  size?: 'small' | 'default' | 'large';
  variant?: 'line';
};
type ListProps = ComponentProps<typeof Primitive.List>;
type ContentProps = ComponentProps<typeof Primitive.Content>;
type TriggerProps = ComponentProps<typeof Primitive.Trigger> & {
  iconLeft?: ReactElement;
  href?: string;
};

export const Root = forwardRef<HTMLDivElement, RootProps>(
  ({ size = 'default', value, variant = 'line', ...props }, ref) => {
    return (
      <Primitive.Root className={s.root} data-size={size} data-variant={variant} value={value} ref={ref} {...props} />
    );
  },
);
Root.displayName = 'Root';

export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  return <Primitive.List className={s.list} ref={ref} {...props} />;
});
List.displayName = 'List';

export const Content = forwardRef<HTMLDivElement, ContentProps>(({ tabIndex = -1, ...props }, ref) => {
  return <Primitive.Content className={s.content} ref={ref} {...props} />;
});
Content.displayName = 'Content';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(({ children, href, iconLeft, ...props }, ref) => {
  const elementRef = useRef<HTMLButtonElement | null>(null);
  const { routerPush, routerPrefetch } = usePagodaUi();

  useEffect(() => {
    if (href) {
      routerPrefetch(href);
    }
  }, [href, routerPrefetch]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (href) {
        if (event.metaKey || event.ctrlKey) {
          window.open(href, '_blank');
        } else {
          routerPush(href);
        }
      }
    }

    const el = elementRef.current;
    el?.addEventListener('click', onClick);

    return () => {
      el?.removeEventListener('click', onClick);
    };
  }, [href, routerPush]);

  return (
    <Primitive.Trigger className={s.trigger} ref={mergeRefs([ref, elementRef])} {...props}>
      {iconLeft && <span className={s.icon}>{iconLeft}</span>}
      {children}
    </Primitive.Trigger>
  );
});
Trigger.displayName = 'Trigger';
