import type { CSSProperties, ReactNode } from 'react';

import { ThemeColor, ThemeGap } from '../utils/types';
import { Container } from './Container';
import { Flex } from './Flex';
import s from './Section.module.scss';

export type SectionProps = {
  background?: 'primary-gradient' | ThemeColor;
  children?: ReactNode;
  className?: string;
  id?: string;
  gap?: ThemeGap;
  grow?: 'available' | 'screen-height';
  padding?: 'standard' | 'hero';
  style?: CSSProperties;
};

export const Section = ({
  background,
  children,
  className = '',
  gap = 'l',
  grow,
  padding,
  style,
  ...props
}: SectionProps) => {
  return (
    <section
      className={`${s.section} ${className}`}
      data-background={background}
      data-grow={grow}
      data-padding={padding}
      style={
        {
          '--section-background-color': `var(--${background})`,
          ...style,
        } as any
      }
      {...props}
    >
      <Container>
        <Flex stack gap={gap}>
          {children}
        </Flex>
      </Container>
    </section>
  );
};
