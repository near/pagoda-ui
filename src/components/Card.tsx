import { type ComponentPropsWithRef, forwardRef } from 'react';

import s from './Card.module.scss';

type Props = ComponentPropsWithRef<'div'>;

export const Card = forwardRef<HTMLDivElement, Props>(({ className = '', ...props }, ref) => {
  return (
    <div
      className={`${s.card} ${className}`}
      role={props.onClick ? 'button' : undefined}
      tabIndex={props.tabIndex || props.onClick ? 0 : undefined}
      ref={ref}
      {...props}
    />
  );
});

Card.displayName = 'Card';
