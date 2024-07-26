import type { CSSProperties, ReactNode } from 'react';

import type { Align, Justify, ThemeGap } from '../utils/types';
import s from './Grid.module.scss';

type Props = {
  align?: Align;
  children: ReactNode;
  columns: string;
  columnsPhone?: string;
  columnsTablet?: string;
  gap?: ThemeGap;
  gapPhone?: ThemeGap;
  gapTablet?: ThemeGap;
  justify?: Justify;
  stretch?: boolean;
  style?: CSSProperties;
};

export const Grid = ({
  align,
  children,
  columns,
  columnsPhone,
  columnsTablet,
  gap = 'm',
  gapPhone,
  gapTablet,
  justify,
  stretch,
  style: styleOverrides,
  ...props
}: Props) => {
  const style = {
    '--columns': columns,
    '--columns-tablet': columnsTablet || columns,
    '--columns-phone': columnsPhone || columnsTablet || columns,
  } as any;

  return (
    <div
      className={s.grid}
      data-align={align}
      data-gap={gap}
      data-gap-phone={gapPhone}
      data-gap-tablet={gapTablet}
      data-justify={justify}
      data-stretch={stretch}
      style={{
        ...styleOverrides,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
