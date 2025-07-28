// features/auth/authActions.ts
import { getProfile, login, updateProfile } from './authThunks';
import { logout, restoreSession as restoreSessionReducer } from './authSlice';
import type { AppDispatch } from '../../app/store';
import type { LoginRequest } from './authTypes';
import { toast } from 'sonner';
import type { UpdateProfileRequest } from '../user/authTypes';

/**
 * Thực hiện login: gọi API, set token vào localStorage
 */
export const loginUser = (loginData: LoginRequest) => async (dispatch: AppDispatch) => {

    const result = await dispatch(login(loginData));
    if (login.fulfilled.match(result)) {
        const token = result.payload.token;
        localStorage.setItem('token', token); // ✅ side-effect hợp lệ tại đây
        dispatch(getProfile());

    }

    if (login.rejected.match(result)) {
        toast.error(result.payload?.message);
    }

    return result; // có thể xử lý tiếp trong component (VD: chuyển trang)


};

/**
 * Thực hiện logout: xóa token khỏi localStorage và Redux
 */
export const logoutUser = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
};

/**
 * Gọi khi app khởi động: khôi phục token từ localStorage vào Redux
 */
export const restoreSession = () => (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const restoreToken = dispatch(restoreSessionReducer(token));
    if (restoreToken) {
        dispatch(getProfile());
    }
};

export const updateUser = (requestData: UpdateProfileRequest) => async (dispatch: AppDispatch) => {
    const result = await dispatch(updateProfile(requestData));
    if (updateProfile.fulfilled.match(result)) {
        dispatch(getProfile());
        toast.success('Profile updated successfully!');
    }

    if (updateProfile.rejected.match(result)) {
        toast.error(result.payload?.message);
    }

}