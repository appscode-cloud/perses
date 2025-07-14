

import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

export type State =
  | {
      type: 'idle';
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    };

export const idle: State = { type: 'idle' };
