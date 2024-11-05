import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { usePagodaUi } from '../context/PagodaUi';

type Props = Omit<ComponentProps<'a'>, 'children' | 'href'> & {
  children: ReactNode;
  href: string | undefined | null;
  target?: ComponentProps<'a'>['target'];
};

export const ConditionalLink = forwardRef<HTMLAnchorElement, Props>(({ href, ...props }, ref) => {
  const { Link } = usePagodaUi();
  if (!href) return props.children;
  return <Link href={href} {...props} ref={ref} />;
});

ConditionalLink.displayName = 'ConditionalLink';
