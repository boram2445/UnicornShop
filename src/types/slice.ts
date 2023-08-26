export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export type Slice = {
  status: RequestStatus;
  error: string;
};
