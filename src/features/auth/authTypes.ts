import type { UserProfile } from "../user/authTypes";


export interface AuthState {
  profile: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}


export interface SerializedError {
  name?: string
  message?: string
  code?: string
}
