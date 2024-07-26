import type { CSSProperties, ReactNode } from 'react';

import type { Align, Justify, Stack, ThemeGap } from '../utils/types';
import s from './Flex.module.scss';

type Props = {
  align?: Align;
  as?: 'div' | 'label' | 'span';
  children: ReactNode;
  className?: string;
  gap?: ThemeGap;
  gapPhone?: ThemeGap;
  gapTablet?: ThemeGap;
  id?: string;
  justify?: Justify;
  stack?: Stack;
  stretch?: boolean;
  style?: CSSProperties;
  wrap?: boolean;
};

export const Flex = ({
  align,
  as = 'div',
  children,
  className = '',
  gap = 'm',
  gapPhone,
  gapTablet,
  justify,
  stack,
  stretch,
  wrap,
  ...props
}: Props) => {
  const Element = as;

  return (
    <Element
      className={`${s.flex} ${className}`}
      data-align={align}
      data-gap={gap}
      data-gap-phone={gapPhone}
      data-gap-tablet={gapTablet}
      data-justify={justify}
      data-stack={stack}
      data-stretch={stretch}
      data-wrap={wrap}
      {...props}
    >
      {children}
    </Element>
  );
};
