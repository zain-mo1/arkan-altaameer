import { useLang } from '@/i18n/context';
import { LegalPage } from './LegalPage';
import { privacy } from './privacy-content';

export default function Privacy() {
  const { pick } = useLang();
  return <LegalPage page="privacy" doc={pick(privacy)} />;
}
