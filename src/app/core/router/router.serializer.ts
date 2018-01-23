
import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { FlatRouterStateSnapshot } from './router.interfaces';

export class CustomRouterStateSerializer implements RouterStateSerializer<FlatRouterStateSnapshot> {
  serialize(routerState: RouterStateSnapshot): FlatRouterStateSnapshot {
    let route = routerState.root;
    const params = {};

    while (route) {
      Object.assign(params, route.params);
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;

    return { url, params, queryParams };
  }
}
