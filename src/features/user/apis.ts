import axiosInstance from "@/app/axiosInstance";
import type { UpdateProfileRequest, UserProfile } from "./authTypes";



export const userAPI = {
     getProfile: async (): Promise<UserProfile> => {
        const response = await axiosInstance.get<UserProfile>("userinfo");
        return response.data;
    },
    
     updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
        const response = await axiosInstance.put<UserProfile>("userinfo", data);
        return response.data;
    },
};

