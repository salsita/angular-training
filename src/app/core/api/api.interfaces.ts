export interface ApiError {
  type: string;
  reason: string;
}

export interface ApiState {
  callsInProgress: number;
  error: ApiError;
}

export interface ApiStateRoot {
  api: ApiState;
}
