export interface Slice {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}
