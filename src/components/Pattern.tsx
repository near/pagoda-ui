import type { CSSProperties, ReactNode } from 'react';

import { ThemeColor } from '../utils/theme';
import s from './Pattern.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  contentMaxWidth?: string;
  patternColor?: ThemeColor;
  patternMaskedBackground?: string;
  style?: CSSProperties;
};

export const Pattern = ({
  children,
  className = '',
  contentMaxWidth,
  patternColor = 'sand-12',
  patternMaskedBackground,
  style,
}: Props) => {
  const variables = {
    '--pattern-background': patternMaskedBackground,
    '--pattern-color': `var(--${patternColor})`,
  };

  return (
    <div
      className={`${s.pattern} ${className}`}
      style={{
        ...style,
        ...variables,
      }}
    >
      <div className={s.content} style={{ maxWidth: contentMaxWidth }}>
        {children}
      </div>
    </div>
  );
};
