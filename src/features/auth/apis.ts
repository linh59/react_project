import aixiosInstance from "../../app/shared/api/axiosInstance";
import type { LoginRequest, UserProfile } from "./authTypes";

export const authAPI = {
    login: async (data: LoginRequest): Promise<UserProfile> => {
        const response = await aixiosInstance.post<UserProfile>("login", data);
        return response.data;
    },
     getProfile: async (): Promise<UserProfile> => {
        const response = await aixiosInstance.get<UserProfile>("userinfo");
        return response.data;
    },
    
};

