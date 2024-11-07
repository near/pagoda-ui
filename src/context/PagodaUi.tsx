import { ThemeProvider } from 'next-themes';
import { type ComponentProps, createContext, ForwardedRef, type ReactNode, useContext } from 'react';

type PagodaUi = {
  Link: (props: {
    children: ReactNode;
    className?: string;
    href: string;
    target?: ComponentProps<'a'>['target'];
    ref?: ForwardedRef<HTMLAnchorElement>;
  }) => ReactNode;
  useRouter: () => {
    prefetch: (path: string) => any;
    push: (path: string) => any;
  };
};

export const PagodaUiContext = createContext<PagodaUi | null>(null);

export const PagodaUiProvider = ({ value, children }: ComponentProps<typeof PagodaUiContext.Provider>) => {
  return (
    <ThemeProvider attribute="class">
      <PagodaUiContext.Provider value={value}>{children}</PagodaUiContext.Provider>
    </ThemeProvider>
  );
};

export function usePagodaUi() {
  const pagodaUi = useContext(PagodaUiContext);

  if (!pagodaUi)
    throw new Error(
      'Pagoda UI context was not found within usePagodaUi(). Make sure to wrap your application with <PagodaUiProvider>',
    );

  return pagodaUi;
}
