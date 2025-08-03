// src/store/cards/cardThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardAPI } from '../apis';
import type { CardModel, CardRequest } from '../authTypes';
import { handleAPIError } from '@/lib/handleAPIError';

// Fetch all cards
export const fetchCards = createAsyncThunk<CardModel[]>(
    'cards/fetchCards',
    async (_, { rejectWithValue }) => {
        try {
            return await cardAPI.getCards();
        } catch (err) {
           const apiError = handleAPIError(err); 
            return rejectWithValue(apiError.message); 
        }
    }
);

// Add a card
export const addCard = createAsyncThunk<CardModel, CardRequest>(
    'cards/addCard',
    async (data, { rejectWithValue }) => {
        try {
            return await cardAPI.addCard(data);
        } catch (err) {
            const apiError = handleAPIError(err); 
            return rejectWithValue(apiError.message); 
            // return rejectWithValue(handleAPIError(err));
        }
    }
);

// Delete card
export const deleteCardThunk = createAsyncThunk<CardModel[], string>(
    'cards/deleteCard',
    async (id: string, { rejectWithValue }) => {
        try {
            await cardAPI.deleteCard(id);

            return await cardAPI.getCards();

        } catch (err) {
            return rejectWithValue(handleAPIError(err));
        }
    }
);
