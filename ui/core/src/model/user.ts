

import { Metadata } from './resource';

export interface NativeProvider {
  password?: string;
}

export interface OAuthProvider {
  issuer?: string;
  email?: string;
  subject?: string;
}

export interface UserSpec {
  firstName?: string;
  lastName?: string;
  nativeProvider?: NativeProvider;
  oauthProviders?: OAuthProvider[];
}

export interface UserResource {
  kind: 'User';
  metadata: Metadata;
  spec: UserSpec;
}
