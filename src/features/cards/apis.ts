import axiosInstance from "@/app/axiosInstance";
import type { CardModel } from "./authTypes";

export const cardAPI = {
     getCards: async () : Promise<CardModel[]> => {
        const response = await axiosInstance.get("guest/cards/list");
        return response.data;
    },
    
};

