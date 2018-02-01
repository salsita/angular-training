export interface EntitiesFetchedPayload {
  route: string;
  key: string;
  result: string | string[];
}

export interface CrudRouteData {
  [key: string]: string | string[];
}

export interface CrudState {
  [route: string]: CrudRouteData;
}

export interface CrudStateRoot {
  crud: CrudState;
}
