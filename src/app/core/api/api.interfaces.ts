export interface ApiErrorPayload {
  type: string;
  reason: string;
}

export interface ApiState {
  callsInProgress: number;
  error: ApiErrorPayload;
}

export interface ApiStateRoot {
  api: ApiState;
}
