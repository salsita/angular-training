import { Data, Params } from '@angular/router';

export interface FlatRouterStateSnapshot {
  url: string;
  params: Params;
  queryParams: Params;
  fragment: string;
  data: Data;
}

export interface RouterState {
  navigationId: number;
  state: FlatRouterStateSnapshot;
}

export interface RouterStateRoot {
  router: RouterState;
}
