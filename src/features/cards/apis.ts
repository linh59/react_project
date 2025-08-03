import axiosInstance from "@/app/axiosInstance";
import type { CardModel, CardRequest } from "./authTypes";

export const cardAPI = {
     getCards: async () : Promise<CardModel[]> => {
        const response = await axiosInstance.get("guest/cards/list");
        console.log(response.data)
        return response.data;
    },
     addCard: async (data: CardRequest) : Promise<CardModel> => {
        const response = await axiosInstance.post("guest/cards", data);
        return response.data;
    },
    deleteCard: async (id: string) : Promise<CardModel> => {
        const response = await axiosInstance.delete(`guest/cards/${id}`);
        return response.data;
    },
    
};

