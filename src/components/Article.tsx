import { ComponentProps, ReactNode } from 'react';

import { usePagodaUi } from '../context/PagodaUi';
import s from './Article.module.scss';

type Props = {
  href: string;
  target?: ComponentProps<'a'>['target'];
  src: string;
  alt: string;
  children?: ReactNode;
};

export const Article = ({ alt, src, children, ...props }: Props) => {
  const { Link } = usePagodaUi();

  return (
    <Link className={s.article} {...props}>
      <div className={s.image}>
        <img alt={alt} src={src} />
      </div>

      {children}
    </Link>
  );
};
