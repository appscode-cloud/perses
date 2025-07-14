

import { ProjectMetadata } from './resource';
import { DurationString } from './time';
import { DashboardSelector, DashboardSpec } from './dashboard';

export interface EphemeralDashboardResource {
  kind: 'EphemeralDashboard';
  metadata: ProjectMetadata;
  spec: EphemeralDashboardSpec;
}

export interface EphemeralDashboardSpec extends DashboardSpec {
  ttl: DurationString;
}

export interface EphemeralDashboardInfo extends DashboardSelector {
  ttl: DurationString;
}
