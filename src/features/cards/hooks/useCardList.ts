import { useEffect, useState } from "react"
import { cardAPI } from "../apis";
import type { CardModel } from "../authTypes";
import { handleAPIError } from "@/lib/handleAPIError";

const useCardList = () => {
    const [cards, setCards] = useState<CardModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchCards = async () => {
        
        setIsLoading(true);
        try {
            const data = await cardAPI.getCards();
            
            setCards(data);
            
        } catch (error) {
            const err = handleAPIError(error);
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    
    return { cards, isLoading, errorMessage, fetchCards };
}

export default useCardList