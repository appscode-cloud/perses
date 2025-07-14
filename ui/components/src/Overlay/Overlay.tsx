

import { Skeleton, SkeletonOwnProps, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';

interface TextOverlayProps {
  message: string;
}

export function TextOverlay(props: TextOverlayProps): ReactElement {
  const { message } = props;

  return (
    <Stack sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Typography>{message}</Typography>
    </Stack>
  );
}

interface NoDataOverlayProps {
  resource: string;
}

export function NoDataOverlay(props: NoDataOverlayProps): ReactElement {
  const { resource } = props;

  return <TextOverlay message={`No ${resource}`} />;
}

interface LoadingOverlayProps {
  variant?: SkeletonOwnProps['variant'];
}

export function LoadingOverlay(props: LoadingOverlayProps): ReactElement {
  const { variant = 'rounded' } = props;

  return (
    <Stack sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', px: 1 }}>
      <Skeleton variant={variant} width="100%" height="30%" aria-label="Loading..." />
    </Stack>
  );
}
