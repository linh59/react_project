import { AxiosError } from "axios";

export interface APIErrorInfo {
  message: string;
  code?: string | number;
  status?: number;
  raw?: unknown; 
}


export const handleAPIError = (error: unknown): APIErrorInfo => {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string; code?: string | number }>;
    const res = axiosError.response;

    return {
      message:
        res?.data?.message ||
        res?.data?.error ||
        "Lỗi không xác định từ server",
      code: res?.data?.code,
      status: res?.status,
      raw: res?.data,
    };
  }

  return {
    message: "Lỗi không xác định",
    raw: error,
  };
};
