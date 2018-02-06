export interface ApiModuleConfig {
  storeNamespace: string;
  baseUrl?: string;
}

export interface ApiErrorPayload {
  type: string;
  reason: string;
}

export interface ApiState {
  callsInProgress: number;
  error: ApiErrorPayload | null;
}

export interface ApiStateRoot {
  api: ApiState;
}
