import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import { User, UserCreationAttributes } from '../types/index';

interface UserState {
    user: User | null;
    isLoggedIn: boolean;
    token: string;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    token: '',
    loading: false,
    error: null,
};

// Async thunk cho đăng ký
export const registerUser = createAsyncThunk(
    '/register',
    async (payload: UserCreationAttributes, { rejectWithValue }) => {
        try {
            const response = await userApi.register(payload);
            return response; // { message, token, user }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Đăng ký thất bại');
        }
    }
);

// Async thunk cho đăng nhập
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (payload: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await userApi.login(payload);
            return response; // { message, token, user }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    }
);

// Async thunk để lấy thông tin user hiện tại
export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userApi.getCurrentUser();
            return response; // { user }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Không thể lấy thông tin user');
        }
    }
);

// Async thunk để cập nhật profile
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData: Partial<UserCreationAttributes>, { rejectWithValue }) => {
        try {
            const response = await userApi.updateProfile(userData);
            return response; // { message, user }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Không thể cập nhật thông tin');
        }
    }
);

// Async thunk để đổi mật khẩu
export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (payload: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
        try {
            const response = await userApi.changePassword(payload);
            return response; // { message }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Không thể đổi mật khẩu');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.token = '';
            state.error = null;
            // Xóa token khỏi localStorage
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Đăng ký
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                // Lưu token vào localStorage
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Đăng nhập
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                // Lưu token vào localStorage
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Lấy thông tin user hiện tại
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // Nếu không lấy được thông tin user, có thể token đã hết hạn
                state.isLoggedIn = false;
                state.user = null;
                state.token = '';
                localStorage.removeItem('token');
            })
            // Cập nhật profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Đổi mật khẩu
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                // Không cần cập nhật state vì chỉ đổi mật khẩu
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer; 