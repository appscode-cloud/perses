

export type ValueMapping =
  | ValueMappingOptions
  | ValueMappingOptionsRange
  | ValueMappingOptionsRegex
  | ValueMappingOptionsMisc;

export interface ValueMappingOptions {
  kind: 'Value';
  spec: {
    value: string | number;
    result: MappedValue;
  };
}

export interface ValueMappingOptionsRange {
  kind: 'Range';
  spec: {
    from?: number;
    to?: number;
    result: MappedValue;
  };
}

export interface ValueMappingOptionsRegex {
  kind: 'Regex';
  spec: {
    pattern: string;
    result: MappedValue;
  };
}

export interface ValueMappingOptionsMisc {
  kind: 'Misc';
  spec: {
    value: 'empty' | 'null' | 'NaN' | 'true' | 'false';
    result: MappedValue;
  };
}

export interface MappedValue {
  value: number | string;
  color?: string;
}
