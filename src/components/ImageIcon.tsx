import type { CSSProperties, ReactNode } from 'react';

import type { ThemeIconSize } from '../utils/theme';
import s from './ImageIcon.module.scss';

type Props = {
  alt: string;
  className?: string;
  fallbackIcon?: ReactNode;
  indicateParentClickable?: boolean;
  padding?: boolean;
  paddingFallbackIcon?: boolean;
  rounded?: boolean;
  transparent?: boolean;
  size?: ThemeIconSize;
  src: string | undefined;
  style?: CSSProperties;
};

export const ImageIcon = ({
  alt,
  className = '',
  fallbackIcon,
  indicateParentClickable,
  padding = true,
  paddingFallbackIcon = true,
  rounded = true,
  transparent,
  size = 'm',
  src,
  ...props
}: Props) => {
  return (
    <div
      className={`${s.imageIcon} ${className} image-icon`}
      data-parent-clickable={indicateParentClickable}
      data-size={size}
      data-no-padding={(!padding && !!src) || (!paddingFallbackIcon && !src)}
      data-rounded={rounded}
      data-transparent={transparent}
      {...props}
    >
      {src ? <img src={src} alt={alt} /> : fallbackIcon}
    </div>
  );
};
