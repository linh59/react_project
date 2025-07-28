import { AxiosError } from "axios";

export interface APIErrorInfo {
  message: string;
  code?: string;
  status?: number;
  raw?: any; // optional: toàn bộ response lỗi
}

/**
 * Xử lý lỗi từ Axios hoặc Unknown Error
 */
export const handleAPIError = (error: unknown): APIErrorInfo => {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<any>;
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
  };
};
