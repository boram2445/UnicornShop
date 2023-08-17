export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export type Slice = {
  status: RequestStatus;
  error: string;
};

export const IDLE_STATUS = "idle";
export const LOADING_STATUS = "loading";
export const SUCCEEDED_STATUS = "succeeded";
export const FAILED_STATUS = "failed";
