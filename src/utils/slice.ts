import axios from "axios";

export const handleAsyncThunkError = (
  err: Error,
  rejectWithValue: (value: any) => void,
  messageKey?: "FAIL_Message"
) => {
  if (axios.isAxiosError(err) && err.response) {
    return !messageKey
      ? rejectWithValue(err.response?.data)
      : rejectWithValue((err.response?.data as any)[messageKey]);
  } else {
    throw new Error("연결 문제 발생");
  }
};
