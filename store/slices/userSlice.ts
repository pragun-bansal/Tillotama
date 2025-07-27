// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
//
// export const STATUSES = Object.freeze({
//     IDLE: 'idle',
//     LOADING: 'loading',
//     ERROR: 'error',
//     SUCCEEDED: 'succeeded',
// });
//
// // Async thunks
// export const fetchUserData = createAsyncThunk(
//     'user/fetchUserData',
//     async (token, { rejectWithValue }) => {
//         try {
//             const response = await axios.put('/api/users/getUser', { token });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
//         }
//     }
// );
//
// export const loginUser = createAsyncThunk(
//     'user/login',
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/api/auth/login', { email, password });
//
//             // Store token in localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', response.data.token);
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//             }
//
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Login failed');
//         }
//     }
// );
//
// export const registerUser = createAsyncThunk(
//     'user/register',
//     async ({ username, email, password }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/api/auth/register', { username, email, password });
//
//             // Store token in localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', response.data.token);
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//             }
//
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Registration failed');
//         }
//     }
// );
//
// export const googleLogin = createAsyncThunk(
//     'user/googleLogin',
//     async ({ email }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/api/auth/google/login', { email });
//
//             // Store token in localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', response.data.token);
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//             }
//
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Google login failed');
//         }
//     }
// );
//
// export const googleRegister = createAsyncThunk(
//     'user/googleRegister',
//     async ({ name, email, profile }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/api/auth/google/register', { name, email, profile });
//
//             // Store token in localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', response.data.token);
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//             }
//
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Google registration failed');
//         }
//     }
// );
//
// export const updateUserProfile = createAsyncThunk(
//     'user/updateProfile',
//     async (userData, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//             const response = await axios.put('/api/users/profile', { ...userData, token });
//
//             // Update localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('user', JSON.stringify(response.data));
//             }
//
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Update failed');
//         }
//     }
// );
//
// export const uploadProfilePicture = createAsyncThunk(
//     'user/uploadProfilePicture',
//     async (formData, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//
//             // Add token to formData
//             const uploadData = new FormData();
//             uploadData.append('token', token);
//             uploadData.append('profilePic', formData.get('profilePic'));
//
//             const response = await axios.post('/api/users/profile', uploadData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//
//             return response.data.filePath;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Upload failed');
//         }
//     }
// );
//
// const initialState = {
//     data: {},
//     status: STATUSES.IDLE,
//     token: null,
//     error: null,
//     isAuthenticated: false,
//     isInitialized: false,
//     isLoading: false,
// };
//
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         logoutUser: (state) => {
//             state.data = {};
//             state.token = null;
//             state.status = STATUSES.IDLE;
//             state.error = null;
//             state.isAuthenticated = false;
//             state.isInitialized = true;
//             state.isLoading = false;
//
//             // Clear localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//             }
//         },
//         setToken: (state, action) => {
//             state.token = action.payload;
//             state.isAuthenticated = !!action.payload;
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('token', action.payload);
//             }
//         },
//         clearError: (state) => {
//             state.error = null;
//         },
//         loadFromStorage: (state) => {
//             if (typeof window !== 'undefined') {
//                 const token = localStorage.getItem('token');
//                 const user = localStorage.getItem('user');
//
//                 if (token) {
//                     state.token = token;
//                     state.isAuthenticated = true;
//                 }
//                 if (user) {
//                     try {
//                         state.data = JSON.parse(user);
//                     } catch (error) {
//                         console.error('Failed to parse user from localStorage:', error);
//                         // Clear corrupted data
//                         localStorage.removeItem('user');
//                     }
//                 }
//                 state.isInitialized = true;
//             }
//         },
//         updateUserData: (state, action) => {
//             state.data = { ...state.data, ...action.payload };
//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('user', JSON.stringify(state.data));
//             }
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Login
//             .addCase(loginUser.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.data = action.payload.user;
//                 state.token = action.payload.token;
//                 state.status = STATUSES.SUCCEEDED;
//                 state.isAuthenticated = true;
//                 state.isInitialized = true;
//                 state.isLoading = false;
//                 state.error = null;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//                 state.isLoading = false;
//                 state.isAuthenticated = false;
//             })
//             // Register
//             .addCase(registerUser.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.data = action.payload.user;
//                 state.token = action.payload.token;
//                 state.status = STATUSES.SUCCEEDED;
//                 state.isAuthenticated = true;
//                 state.isInitialized = true;
//                 state.isLoading = false;
//                 state.error = null;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//                 state.isLoading = false;
//                 state.isAuthenticated = false;
//             })
//             // Google Login
//             .addCase(googleLogin.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(googleLogin.fulfilled, (state, action) => {
//                 state.data = action.payload.user;
//                 state.token = action.payload.token;
//                 state.status = STATUSES.SUCCEEDED;
//                 state.isAuthenticated = true;
//                 state.isInitialized = true;
//                 state.isLoading = false;
//                 state.error = null;
//             })
//             .addCase(googleLogin.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//                 state.isLoading = false;
//                 state.isAuthenticated = false;
//             })
//             // Google Register
//             .addCase(googleRegister.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(googleRegister.fulfilled, (state, action) => {
//                 state.data = action.payload.user;
//                 state.token = action.payload.token;
//                 state.status = STATUSES.SUCCEEDED;
//                 state.isAuthenticated = true;
//                 state.isInitialized = true;
//                 state.isLoading = false;
//                 state.error = null;
//             })
//             .addCase(googleRegister.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//                 state.isLoading = false;
//                 state.isAuthenticated = false;
//             })
//             // Fetch user data
//             .addCase(fetchUserData.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.isLoading = true;
//             })
//             .addCase(fetchUserData.fulfilled, (state, action) => {
//                 state.data = action.payload;
//                 state.status = STATUSES.SUCCEEDED;
//                 state.isLoading = false;
//                 state.error = null;
//                 // Update localStorage
//                 if (typeof window !== 'undefined') {
//                     localStorage.setItem('user', JSON.stringify(action.payload));
//                 }
//             })
//             .addCase(fetchUserData.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//                 state.isLoading = false;
//                 // If fetch fails, might be invalid token
//                 if (action.payload?.includes('not authenticated') || action.payload?.includes('token')) {
//                     state.isAuthenticated = false;
//                     state.token = null;
//                 }
//             })
//             // Update profile
//             .addCase(updateUserProfile.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.isLoading = true;
//             })
//             .addCase(updateUserProfile.fulfilled, (state, action) => {
//                 state.data = action.payload;
//                 state.status = STATUSES.SUCCEEDED;
//                 state.isLoading = false;
//                 state.error = null;
//             })
//             .addCase(updateUserProfile.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//                 state.isLoading = false;
//             })
//             // Upload profile picture
//             .addCase(uploadProfilePicture.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.isLoading = true;
//             })
//             .addCase(uploadProfilePicture.fulfilled, (state, action) => {
//                 state.data.pfp = action.payload;
//                 state.status = STATUSES.SUCCEEDED;
//                 state.isLoading = false;
//                 state.error = null;
//                 // Update localStorage
//                 if (typeof window !== 'undefined') {
//                     localStorage.setItem('user', JSON.stringify(state.data));
//                 }
//             })
//             .addCase(uploadProfilePicture.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//                 state.isLoading = false;
//             });
//     },
// });
//
// export const {
//     logoutUser,
//     setToken,
//     clearError,
//     loadFromStorage,
//     updateUserData
// } = userSlice.actions;
//
// export default userSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Types
export const STATUSES = {
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
    SUCCEEDED: 'succeeded',
} as const;

type Status = typeof STATUSES[keyof typeof STATUSES];

interface User {
    _id: string;
    name: string;
    lastName?: string;
    username?: string;
    email: string;
    phoneNumber?: string;
    gender?: string;
    addressLine1?: string;
    addressLine2?: string;
    town?: string;
    city?: string;
    pinCode?: string;
    allowTestimonialEmails?: boolean;
    admin?: boolean;
    pfp?: string;
    testimonials?: string[];
    createdAt?: string;
    updatedAt?: string;
}

interface UserState {
    data: User | Record<string, never>;
    status: Status;
    token: string | null;
    error: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    isLoading: boolean;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

interface GoogleLoginData {
    email: string;
}

interface GoogleRegisterData {
    name: string;
    email: string;
    profile: any;
}

interface AuthResponse {
    user: User;
    token: string;
}

interface ApiErrorResponse {
    message: string;
}

interface RootState {
    user: UserState;
}

// Helper function for handling API errors
const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        return axiosError.response?.data?.message || axiosError.message || 'An error occurred';
    }
    return 'An unexpected error occurred';
};

// Async thunks
export const fetchUserData = createAsyncThunk<
        User,
    string,
    { rejectValue: string }
>(
    'user/fetchUserData',
        async (token: string, { rejectWithValue }) => {
            try {
                const response = await axios.put<User>('/api/users/getUser', { token });
                return response.data;
            } catch (error) {
                return rejectWithValue(handleApiError(error));
            }
        }
);

export const loginUser = createAsyncThunk<
        AuthResponse,
    LoginCredentials,
    { rejectValue: string }
>(
    'user/login',
        async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
            try {
                const response = await axios.post<AuthResponse>('/api/auth/login', { email, password });

                // Store token in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                return response.data;
            } catch (error) {
                return rejectWithValue(handleApiError(error));
            }
        }
);

export const registerUser = createAsyncThunk<
        AuthResponse,
    RegisterCredentials,
    { rejectValue: string }
>(
    'user/register',
        async ({ username, email, password }: RegisterCredentials, { rejectWithValue }) => {
            try {
                const response = await axios.post<AuthResponse>('/api/auth/register', { username, email, password });

                // Store token in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                return response.data;
            } catch (error) {
                return rejectWithValue(handleApiError(error));
            }
        }
);

export const googleLogin = createAsyncThunk<
        AuthResponse,
    GoogleLoginData,
    { rejectValue: string }
>(
    'user/googleLogin',
        async ({ email }: GoogleLoginData, { rejectWithValue }) => {
            try {
                const response = await axios.post<AuthResponse>('/api/auth/google/login', { email });

                // Store token in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                return response.data;
            } catch (error) {
                return rejectWithValue(handleApiError(error));
            }
        }
);

export const googleRegister = createAsyncThunk<
        AuthResponse,
    GoogleRegisterData,
    { rejectValue: string }
>(
    'user/googleRegister',
        async ({ name, email, profile }: GoogleRegisterData, { rejectWithValue }) => {
            try {
                const response = await axios.post<AuthResponse>('/api/auth/google/register', { name, email, profile });

                // Store token in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                return response.data;
            } catch (error) {
                return rejectWithValue(handleApiError(error));
            }
        }
);

export const updateUserProfile = createAsyncThunk<
        User,
    Partial<User>,
{ state: RootState; rejectValue: string }
>(
    'user/updateProfile',
        async (userData: Partial<User>, { getState, rejectWithValue }) => {
            try {
                const state = getState();
                const token = state.user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
                const response = await axios.put<User>('/api/users/profile', { ...userData, token });

                // Update localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            } catch (error) {
                return rejectWithValue(handleApiError(error));
            }
        }
);

export const uploadProfilePicture = createAsyncThunk<
        string,
    FormData,
    { state: RootState; rejectValue: string }
>(
    'user/uploadProfilePicture',
        async (formData: FormData, { getState, rejectWithValue }) => {
            try {
                const state = getState();
                const token = state.user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

                if (!token) {
                    return rejectWithValue('No authentication token found');
                }

                // Add token to formData
                const uploadData = new FormData();
                uploadData.append('token', token);
                const profilePic = formData.get('profilePic');
                if (profilePic) {
                    uploadData.append('profilePic', profilePic);
                }

                const response = await axios.post<{ filePath: string }>('/api/users/profile', uploadData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                return response.data.filePath;
            } catch (error) {
                return rejectWithValue(handleApiError(error));
            }
        }
);

const initialState: UserState = {
    data: {},
    status: STATUSES.IDLE,
    token: null,
    error: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,
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
            state.isAuthenticated = false;
            state.isInitialized = true;
            state.isLoading = false;

            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
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

                if (token) {
                    state.token = token;
                    state.isAuthenticated = true;
                }
                if (user) {
                    try {
                        state.data = JSON.parse(user) as User;
                    } catch (error) {
                        console.error('Failed to parse user from localStorage:', error);
                        // Clear corrupted data
                        localStorage.removeItem('user');
                    }
                }
                state.isInitialized = true;
            }
        },
        updateUserData: (state, action: PayloadAction<Partial<User>>) => {
    state.data = { ...state.data, ...action.payload } as User | Record<string, never>;
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(state.data));
    }
},
},
extraReducers: (builder) => {
    builder
        // Login
        .addCase(loginUser.pending, (state) => {
            state.status = STATUSES.LOADING;
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.data = action.payload.user;
            state.token = action.payload.token;
            state.status = STATUSES.SUCCEEDED;
            state.isAuthenticated = true;
            state.isInitialized = true;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload || 'Login failed';
            state.isLoading = false;
            state.isAuthenticated = false;
        })
        // Register
        .addCase(registerUser.pending, (state) => {
            state.status = STATUSES.LOADING;
            state.isLoading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.data = action.payload.user;
            state.token = action.payload.token;
            state.status = STATUSES.SUCCEEDED;
            state.isAuthenticated = true;
            state.isInitialized = true;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload || 'Registration failed';
            state.isLoading = false;
            state.isAuthenticated = false;
        })
        // Google Login
        .addCase(googleLogin.pending, (state) => {
            state.status = STATUSES.LOADING;
            state.isLoading = true;
            state.error = null;
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
            state.data = action.payload.user;
            state.token = action.payload.token;
            state.status = STATUSES.SUCCEEDED;
            state.isAuthenticated = true;
            state.isInitialized = true;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(googleLogin.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload || 'Google login failed';
            state.isLoading = false;
            state.isAuthenticated = false;
        })
        // Google Register
        .addCase(googleRegister.pending, (state) => {
            state.status = STATUSES.LOADING;
            state.isLoading = true;
            state.error = null;
        })
        .addCase(googleRegister.fulfilled, (state, action) => {
            state.data = action.payload.user;
            state.token = action.payload.token;
            state.status = STATUSES.SUCCEEDED;
            state.isAuthenticated = true;
            state.isInitialized = true;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(googleRegister.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload || 'Google registration failed';
            state.isLoading = false;
            state.isAuthenticated = false;
        })
        // Fetch user data
        .addCase(fetchUserData.pending, (state) => {
            state.status = STATUSES.LOADING;
            state.isLoading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.SUCCEEDED;
            state.isLoading = false;
            state.error = null;
            // Update localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload || 'Failed to fetch user data';
            state.isLoading = false;
            // If fetch fails, might be invalid token
            if (action.payload?.includes('not authenticated') || action.payload?.includes('token')) {
                state.isAuthenticated = false;
                state.token = null;
            }
        })
        // Update profile
        .addCase(updateUserProfile.pending, (state) => {
            state.status = STATUSES.LOADING;
            state.isLoading = true;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.SUCCEEDED;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload || 'Update failed';
            state.isLoading = false;
        })
        // Upload profile picture
        .addCase(uploadProfilePicture.pending, (state) => {
            state.status = STATUSES.LOADING;
            state.isLoading = true;
        })
        .addCase(uploadProfilePicture.fulfilled, (state, action) => {
            if (typeof state.data === 'object' && state.data !== null) {
                (state.data as User).pfp = action.payload;
            }
            state.status = STATUSES.SUCCEEDED;
            state.isLoading = false;
            state.error = null;
            // Update localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(state.data));
            }
        })
        .addCase(uploadProfilePicture.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload || 'Upload failed';
            state.isLoading = false;
        });
},
});

export const {
    logoutUser,
    setToken,
    clearError,
    loadFromStorage,
    updateUserData
} = userSlice.actions;

export default userSlice.reducer;

// Export types for use in other files
export type { User, UserState, RootState, LoginCredentials, RegisterCredentials, GoogleLoginData, GoogleRegisterData };