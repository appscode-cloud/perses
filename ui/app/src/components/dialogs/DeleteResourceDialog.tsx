

import { getResourceExtendedDisplayName, Resource } from '@perses-dev/core';
import { Dispatch, DispatchWithoutAction, ReactElement } from 'react';
import { Dialog } from '@perses-dev/components';
import { Button } from '@mui/material';

interface DeleteResourceDialogProps<T extends Resource> {
  resource: T;
  open: boolean;
  onSubmit: Dispatch<T>;
  onClose: DispatchWithoutAction;
}

/**
 * Dialog used to delete a resource.
 * @param props.role The resource to delete.
 * @param props.open Define if the dialog should be opened or not.
 * @param props.onSubmit Action to perform when user confirmed.
 * @param props.onClose Provides the function to close itself.
 */
export function DeleteResourceDialog<T extends Resource>(props: DeleteResourceDialogProps<T>): ReactElement {
  const { resource, open, onSubmit, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Header>
        Delete {resource.kind}: {resource.metadata.name}
      </Dialog.Header>
      <Dialog.Content>
        Are you sure you want to delete the {resource.kind}: <strong>{getResourceExtendedDisplayName(resource)}</strong>
        ? This action cannot be undone.
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="contained" type="submit" onClick={() => onSubmit(resource)}>
          Delete
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
