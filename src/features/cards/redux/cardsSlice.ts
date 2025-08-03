// src/store/cards/cardSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCards, addCard, deleteCardThunk } from './cardThunks';
import type { CardModel } from '../authTypes';

interface CardState {
    list: CardModel[];

    // Fetch cards
    fetchLoading: boolean;
    fetchError: string | null;

    // Add card
    addLoading: boolean;
    addError: string | null;

    // Delete card
    deleteLoading: boolean;
    deleteError: string | null;
}

const initialState: CardState = {
    list: [],

    fetchLoading: false,
    fetchError: null,

    addLoading: false,
    addError: null,

    deleteLoading: false,
    deleteError: null,
};

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        // resetError: (state) => {
        //     state.error = null;
        // },
    },
    extraReducers: (builder) => {
        // Fetch cards
        builder.addCase(fetchCards.pending, (state) => {
            state.fetchLoading = true;
            state.fetchError = null;
        });
        builder.addCase(fetchCards.fulfilled, (state, action: PayloadAction<CardModel[]>) => {
            state.fetchLoading = false;
            state.list = action.payload;
        });
        builder.addCase(fetchCards.rejected, (state, action) => {
            state.fetchLoading = false;
            state.fetchError = action.payload as string;
        });

        // Add card
        builder.addCase(addCard.pending, (state) => {
            state.addLoading = true;
            state.addError = null;
        });
        builder.addCase(addCard.fulfilled, (state, action: PayloadAction<CardModel>) => {
            state.addLoading = false;
            state.list.push(action.payload);
        });
        builder.addCase(addCard.rejected, (state, action) => {
            state.addLoading = false;
            state.addError = action.payload as string;
        });

        // Delete card
        builder.addCase(deleteCardThunk.pending, (state) => {
            state.deleteLoading = true;
            state.deleteError = null;
        });
        builder.addCase(deleteCardThunk.fulfilled, (state, action: PayloadAction<CardModel[]>) => {
            state.deleteLoading = false;
            state.list = action.payload;
        });
        builder.addCase(deleteCardThunk.rejected, (state, action) => {
            state.deleteLoading = false;
            state.deleteError = action.payload as string;
        });
    },
});

// export const { resetError } = cardSlice.actions;
export default cardSlice.reducer;
