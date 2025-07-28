import aixiosInstance from "../../app/shared/api/axiosInstance";
import type { UpdateProfileRequest, UserProfile } from "./authTypes";



export const userAPI = {
     getProfile: async (): Promise<UserProfile> => {
        const response = await aixiosInstance.get<UserProfile>("userinfo");
        return response.data;
    },
    
     updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
        const response = await aixiosInstance.put<UserProfile>("userinfo", data);
        return response.data;
    },
};

