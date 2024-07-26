import type { CSSProperties, ReactNode } from 'react';

import { ThemeGap } from '../utils/types';
import { Container } from './Container';
import { Flex } from './Flex';
import s from './Section.module.scss';

export type SectionProps = {
  background?: 'primary-gradient';
  children?: ReactNode;
  className?: string;
  id?: string;
  gap?: ThemeGap;
  grow?: 'available' | 'screen-height';
  style?: CSSProperties;
};

export const Section = ({ background, children, className = '', gap = 'l', grow, ...props }: SectionProps) => {
  return (
    <section className={`${s.section} ${className}`} data-background={background} data-grow={grow} {...props}>
      <Container>
        <Flex stack gap={gap}>
          {children}
        </Flex>
      </Container>
    </section>
  );
};
