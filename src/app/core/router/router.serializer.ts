import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { FlatRouterStateSnapshot } from './router.interfaces';

export class CustomRouterStateSerializer implements RouterStateSerializer<FlatRouterStateSnapshot> {
  serialize(routerState: RouterStateSnapshot): FlatRouterStateSnapshot {
    let route: ActivatedRouteSnapshot = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url } = routerState;
    const { params, queryParams, data, fragment } = route;

    return { url, params, queryParams, data, fragment };
  }
}
