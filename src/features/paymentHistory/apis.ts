import type { IQueryParams } from "@/shared/types";
import type { PaymentHistoryResponse } from "./authTypes";
import axiosInstance from "@/app/axiosInstance";

export const paymentHistoryAPI = {
     getHistory: async (params?: IQueryParams) : Promise<PaymentHistoryResponse> => {
        const response = await axiosInstance.get("guest/orders", {params});
        return response.data;
    },
    
};

