

import { Action, DispatchWithPromise } from '@perses-dev/core';
import { Dispatch, DispatchWithoutAction } from 'react';

export interface DrawerProps<T> {
  action: Action;
  isOpen: boolean;
  isReadonly?: boolean;
  onActionChange?: Dispatch<Action>;
  onSave: Dispatch<T>;
  onDelete?: DispatchWithPromise<T>;
  onClose: DispatchWithoutAction;
}

export interface FormEditorProps<T> {
  initialValue: T;
  action: Action;
  isDraft: boolean;
  isReadonly?: boolean;
  onActionChange?: Dispatch<Action>;
  onSave: Dispatch<T>;
  onDelete?: DispatchWithoutAction;
  onClose: DispatchWithoutAction;
}
