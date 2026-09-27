import { useLang } from '@/i18n/context';
import { LegalPage } from './LegalPage';
import { terms } from './terms-content';

export default function Terms() {
  const { pick } = useLang();
  return <LegalPage page="terms" doc={pick(terms)} />;
}
