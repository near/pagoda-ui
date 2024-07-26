import { openToast } from '../components/Toast';

export function handleClientError({ error, title, description }: { error: any; title?: string; description?: string }) {
  console.error(error);
  openToast({
    type: 'error',
    title: title || 'Unexpected Error',
    description: description || 'Please try again later',
  });
}
