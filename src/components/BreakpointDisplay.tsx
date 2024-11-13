import { CSSProperties, type ReactNode } from 'react';

import s from './BreakpointDisplay.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  show:
    | 'sidebar-small-screen'
    | 'smaller-than-desktop'
    | 'smaller-than-tablet'
    | 'larger-than-phone'
    | 'larger-than-tablet';
  style?: CSSProperties;
};

export const BreakpointDisplay = ({ children, className = '', show, ...props }: Props) => {
  return (
    <div className={`${s.breakpoint} ${className}`} data-show={show} {...props}>
      {children}
    </div>
  );
};
