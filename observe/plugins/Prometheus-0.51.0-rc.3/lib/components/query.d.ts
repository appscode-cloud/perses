import { DatasourceSelector, StatusError } from '@perses-dev/core';
import { UseQueryResult } from '@tanstack/react-query';
import { MonitoredInstantQueryResponse, ParseQueryResponse } from '../model';
export declare function useParseQuery(content: string, datasource: DatasourceSelector, enabled?: boolean): UseQueryResult<ParseQueryResponse, StatusError>;
export declare function useInstantQuery(content: string, datasource: DatasourceSelector, enabled?: boolean): UseQueryResult<MonitoredInstantQueryResponse, StatusError>;
//# sourceMappingURL=query.d.ts.map