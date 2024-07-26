import { CSSProperties, ReactNode } from 'react';

import { ThemeColor, ThemeFontSize } from '../utils/types';
import s from './Text.module.scss';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

const defaultSizes: Record<Tag, ThemeFontSize> = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-l',
  h5: 'text-base',
  h6: 'text-s',
  p: 'text-base',
  span: 'text-base',
};

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  clampLines?: number;
  className?: string;
  color?: ThemeColor;
  id?: string;
  size?: ThemeFontSize;
  style?: CSSProperties;
  weight?: string | number;
};

export const Text = ({
  as = 'p',
  children,
  clampLines,
  className = '',
  color,
  size,
  style,
  weight,
  ...props
}: Props) => {
  const Tag = as;
  const defaultSize = defaultSizes[as];

  return (
    <Tag
      className={`${s.text} ${className}`}
      data-clamp-lines={clampLines}
      data-size={size || defaultSize}
      style={{
        color: color ? (color === 'current' ? 'currentColor' : `var(--${color})`) : undefined,
        fontWeight: weight,
        WebkitLineClamp: clampLines,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};
