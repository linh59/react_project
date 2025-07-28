export interface UserProfile {
  id: string;
  active_user: boolean;
  token: string;
  email?: string;
  phone?: string;
  display_name?: string;
  address?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthState {
  profile: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isError: boolean;
}

export interface UpdateProfileRequest {
  email?: string;
  address?: string;
  first_name?: string;
  last_name?: string;
  country_code?: string;
  phone?: string;
}


