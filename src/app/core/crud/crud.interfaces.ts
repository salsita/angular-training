export type CrudId = string | number;

export interface EntitiesFetchedPayload {
  route: string;
  key: string;
  result: CrudId | CrudId[];
}

export interface CrudRouteData {
  [key: string]: CrudId | CrudId[];
}

export interface CrudState {
  [route: string]: CrudRouteData;
}

export interface CrudStateRoot {
  crud: CrudState;
}
