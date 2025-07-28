import aixiosInstance from "../../app/shared/api/axiosInstance";
import type { CardModel } from "./authTypes";

export const cardAPI = {
     getCards: async () : Promise<CardModel[]> => {
        const response = await aixiosInstance.get("guest/cards/list");
        return response.data;
    },
    
};

