import { Helmet } from 'react-helmet';
import { useQRScoutState } from '../store/store';

export function Header() {
  const page_title = useQRScoutState(state => state.formData.page_title);
  const title = useQRScoutState(state => state.formData.title);
  return (
    <Helmet>
      <title>{title} | {page_title}</title>
      <link rel="icon" href="/QRScout/favicon.ico" />
    </Helmet>
  );
}
