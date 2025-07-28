import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginRequest } from './authTypes';
import { authAPI } from './apis';
import type { AxiosError } from 'axios';
import type { UpdateProfileRequest, UserProfile } from '../user/authTypes';
import { userAPI } from '../user/apis';

export interface ValidationErrors {
    code: string;
    message: string;
}
export const login = createAsyncThunk<UserProfile, LoginRequest, { rejectValue: ValidationErrors }>(
    'auth/login',
    async (loginData: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await authAPI.login(loginData);
            return response;
        } catch (err) {
            const axiosError = err as AxiosError<ValidationErrors>;
            const error = axiosError.response?.data || {
                code: "500",
                message: "Unexpected error",
            };
            return rejectWithValue(error);
        }

    }
);


export const getProfile = createAsyncThunk<UserProfile>(
    'auth/profile',
    async () => {
        const response = await authAPI.getProfile();
        return response;
    }
);

export const updateProfile = createAsyncThunk<UserProfile, UpdateProfileRequest, { rejectValue: ValidationErrors }>(
    'user/update',
    async (request, { rejectWithValue }) => {
        try {
            const response = await userAPI.updateProfile(request);
            return response;
        } catch (err) {
            const axiosError = err as AxiosError<ValidationErrors>;
            const error = axiosError.response?.data || {
                code: "500",
                message: "Unexpected error",
            };
            return rejectWithValue(error);
        }

    }
);