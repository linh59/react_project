import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from './authTypes';
import { getProfile, login, updateProfile } from './authThunks';
import { toast } from 'sonner';

const initialState: AuthState = {
  profile: null,
  token: null,
  isLoading: false,
  isError: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreSession: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log(action.payload)
        state.profile = action.payload;
      })
       .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log(action.payload)
        state.profile = action.payload;
       
      })
       .addCase(updateProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

      })
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
