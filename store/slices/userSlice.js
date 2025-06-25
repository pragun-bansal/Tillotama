// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
});

// Async thunks
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.put('/api/users/getUser', { token });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });

            // Store token in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/register', { username, email, password });

            // Store token in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.put('/api/users/profile', { ...userData, token });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Update failed');
        }
    }
);

const initialState = {
    data: {},
    status: STATUSES.IDLE,
    token: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.data = {};
            state.token = null;
            state.status = STATUSES.IDLE;
            state.error = null;

            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload);
            }
        },
        clearError: (state) => {
            state.error = null;
        },
        loadFromStorage: (state) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                const user = localStorage.getItem('user');

                if (token) state.token = token;
                if (user) {
                    try {
                        state.data = JSON.parse(user);
                    } catch (error) {
                        console.error('Failed to parse user from localStorage:', error);
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.data = action.payload.user;
                state.token = action.payload.token;
                state.status = STATUSES.IDLE;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.data = action.payload.user;
                state.token = action.payload.token;
                state.status = STATUSES.IDLE;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            })
            // Fetch user data
            .addCase(fetchUserData.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.error = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            })
            // Update profile
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.error = null;

                // Update localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(action.payload));
                }
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            });
    },
});

export const { logoutUser, setToken, clearError, loadFromStorage } = userSlice.actions;
export default userSlice.reducer;