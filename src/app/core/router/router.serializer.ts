import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { FlatRouterStateSnapshot } from './router.interfaces';

export class CustomRouterStateSerializer implements RouterStateSerializer<FlatRouterStateSnapshot> {
  serialize(routerState: RouterStateSnapshot): FlatRouterStateSnapshot {
    let route: ActivatedRouteSnapshot | null = routerState.root;
    const params = {};

    while (route) {
      Object.assign(params, route.params);
      if (route.firstChild) {
      }
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;

    return { url, params, queryParams };
  }
}
