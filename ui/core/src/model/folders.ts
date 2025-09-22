// -----------------------------
// folder.ts
// -----------------------------

import { ProjectMetadata } from './resource';

// --- Types ---
export interface FolderResource {
  kind: 'Folder';
  metadata: ProjectMetadata;
  spec: FolderSpec;
}

export interface FolderSpec {
  description?: string;
}

export interface FolderSelector {
  project: string;
  folder: string;
}
