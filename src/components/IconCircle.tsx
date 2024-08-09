import { ReactNode } from 'react';

import { ThemeColor } from '../utils/types';
import s from './IconCircle.module.scss';

type Props = {
  color?: ThemeColor;
  icon: ReactNode;
};

export const IconCircle = ({ color = 'sand11', icon }: Props) => {
  return (
    <div
      className={s.iconCircle}
      style={{ color: color ? (color === 'current' ? 'currentColor' : `var(--${color})`) : undefined }}
    >
      {icon}
    </div>
  );
};
