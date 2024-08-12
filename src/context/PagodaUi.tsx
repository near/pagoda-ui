import { type ComponentProps, createContext, type ReactNode, useContext } from 'react';

type PagodaUi = {
  routerPrefetch: (path: string) => any;
  routerPush: (path: string) => any;
  Link: (props: {
    children: ReactNode;
    className?: string;
    href: string;
    target?: ComponentProps<'a'>['target'];
  }) => ReactNode;
};

export const PagodaUiContext = createContext<PagodaUi | null>(null);

export function usePagodaUi() {
  const pagodaUi = useContext(PagodaUiContext);

  if (!pagodaUi)
    throw new Error(
      'Pagoda UI context was not found within usePagodaUi(). Make sure to wrap your application with <PagodaUiProvider>',
    );

  return pagodaUi;
}
