

export interface TransformCommonSpec {
  disabled?: boolean;
}

export interface JoinByColumnValueTransform {
  kind: 'JoinByColumnValue';
  spec: TransformCommonSpec & {
    columns: string[];
  };
}

export interface MergeColumnsTransform {
  kind: 'MergeColumns';
  spec: TransformCommonSpec & {
    columns: string[];
    name: string;
  };
}

export interface MergeIndexedColumnsTransform {
  kind: 'MergeIndexedColumns';
  spec: TransformCommonSpec & {
    column: string;
  };
}

export interface MergeSeriesTransform {
  kind: 'MergeSeries';
  spec: TransformCommonSpec;
}

export type Transform =
  | JoinByColumnValueTransform
  | MergeColumnsTransform
  | MergeIndexedColumnsTransform
  | MergeSeriesTransform;

// Can be moved somewhere else
export const TRANSFORM_TEXT = {
  JoinByColumnValue: 'Join by column value',
  MergeColumns: 'Merge columns',
  MergeIndexedColumns: 'Merge indexed columns',
  MergeSeries: 'Merge series',
};
