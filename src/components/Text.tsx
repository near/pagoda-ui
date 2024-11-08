import { ComponentProps, ComponentPropsWithRef, type CSSProperties, forwardRef } from 'react';

import { usePagodaUi } from '../context/PagodaUi';
import { type ThemeColor, type ThemeFontSize } from '../utils/theme';
import s from './Text.module.scss';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';

const defaultSizes: Record<Tag, ThemeFontSize> = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-l',
  h5: 'text-base',
  h6: 'text-s',
  p: 'text-base',
  span: 'text-base',
  label: 'text-base',
};

type Props = Omit<ComponentPropsWithRef<'p'>, 'color'> & {
  as?: Tag;
  clampLines?: number;
  clickableHighlight?: boolean;
  color?: ThemeColor;
  decoration?: CSSProperties['textDecoration'];
  family?: 'standard' | 'monospace';
  forceWordBreak?: boolean;
  href?: string;
  target?: ComponentProps<'a'>['target'];
  size?: ThemeFontSize;
  sizePhone?: ThemeFontSize;
  sizeTablet?: ThemeFontSize;
  noWrap?: boolean;
  weight?: string | number;
  uppercase?: boolean;
};

export const Text = forwardRef<HTMLParagraphElement, Props>(
  (
    {
      as = 'p',
      children,
      clampLines,
      className = '',
      clickableHighlight,
      family,
      forceWordBreak,
      size,
      style,
      noWrap,
      onClick,
      uppercase,
      ...props
    },
    ref,
  ) => {
    const Tag = as;
    const defaultSize = defaultSizes[as];
    const { Link } = usePagodaUi();
    const Element: any = props.href ? Link : Tag;
    const color = props.color ?? (props.href ? 'violet-10' : undefined);
    const weight = props.weight ?? (props.href ? 500 : undefined);
    const decoration = props.decoration ?? (props.href ? 'underline' : undefined);

    return (
      <Element
        className={`${s.text} ${className}`}
        data-clamp-lines={clampLines}
        data-size={size ?? defaultSize}
        data-clickable-highlight={clickableHighlight}
        data-family={family}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        style={{
          color: color ? (color === 'current' ? 'currentColor' : `var(--${color})`) : undefined,
          textDecoration: decoration,
          fontWeight: weight,
          WebkitLineClamp: clampLines,
          whiteSpace: noWrap ? 'nowrap' : undefined,
          wordBreak: forceWordBreak ? 'break-word' : undefined,
          textTransform: uppercase ? 'uppercase' : undefined,
          ...style,
        }}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </Element>
    );
  },
);

Text.displayName = 'Text';
