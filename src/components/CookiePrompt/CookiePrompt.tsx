import { usePagodaUi } from '../../context/PagodaUi';
import { Button } from '../Button';
import { Text } from '../Text';
import s from './CookiePrompt.module.scss';
import { useCookiePreferences } from './hooks';

type Props = {
  cookiePolicyUrl?: string;
};

export const CookiePrompt = ({ cookiePolicyUrl = '/cookies' }: Props) => {
  const { cookiesPreference, setCookiesPreference } = useCookiePreferences();
  const { Link } = usePagodaUi();

  if (cookiesPreference) return null;

  return (
    <div className={s.cookiePrompt}>
      <Text size="text-s" sizePhone="text-xs">
        We use our own and third-party cookies on our website to enhance your experience, analyze traffic, and for
        marketing. For more information see our&nbsp;
        <Link target="_blank" href={cookiePolicyUrl}>
          Cookie Policy
        </Link>
      </Text>

      <div className={s.actions}>
        <Button size="small" label="Accept" variant="primary" onClick={() => setCookiesPreference('all')} />

        <Button
          size="small"
          label="Only Required"
          variant="secondary"
          onClick={() => setCookiesPreference('only_required')}
        />
      </div>
    </div>
  );
};
