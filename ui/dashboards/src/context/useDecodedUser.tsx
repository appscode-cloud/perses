import { useCookies } from 'react-cookie';
const activeAccount = 'active_account';

export function useDecodedActiveUser(): string | undefined {
  const [cookies] = useCookies([activeAccount]);
  return cookies[activeAccount] || undefined;
}
