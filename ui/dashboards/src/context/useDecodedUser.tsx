import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { decodeToken } from 'react-jwt';

const jwtPayload = 'jwtPayload';

interface Payload {
  iss?: string;
  sub?: string;
  aud?: string[];
  exp?: Date;
  nbf?: Date;
  iat?: Date;
  jti?: string;
}

export function useDecodedUser(): UseQueryResult<Payload | null> {
  const [cookies] = useCookies();
  const partialToken = cookies[jwtPayload];
  // useJWT need a complete token (including a signature) to be able to decode it.
  // It doesn't need the accurate signature to decode the payload.
  // That's why we are creating a fake signature.
  const fakeSignature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  return useQuery({
    queryKey: ['jwt'],
    queryFn: () => decodeToken<Payload>(`${partialToken}.${fakeSignature}`),
    enabled: !!partialToken,
  });
}
