// // store/slices/userSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
//
// export const STATUSES = Object.freeze({
//     IDLE: 'idle',
//     LOADING: 'loading',
//     ERROR: 'error',
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
// export const updateUserProfile = createAsyncThunk(
//     'user/updateProfile',
//     async (userData, { getState, rejectWithValue }) => {
//         try {
//             const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
//             const response = await axios.put('/api/users/profile', { ...userData, token });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || 'Update failed');
//         }
//     }
// );
//
// const initialState = {
//     data: {},
//     status: STATUSES.IDLE,
//     token: null,
//     error: null,
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
//
//             // Clear localStorage
//             if (typeof window !== 'undefined') {
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//             }
//         },
//         setToken: (state, action) => {
//             state.token = action.payload;
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
//                 if (token) state.token = token;
//                 if (user) {
//                     try {
//                         state.data = JSON.parse(user);
//                     } catch (error) {
//                         console.error('Failed to parse user from localStorage:', error);
//                     }
//                 }
//             }
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Login
//             .addCase(loginUser.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.data = action.payload.user;
//                 state.token = action.payload.token;
//                 state.status = STATUSES.IDLE;
//                 state.error = null;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//             })
//             // Register
//             .addCase(registerUser.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.data = action.payload.user;
//                 state.token = action.payload.token;
//                 state.status = STATUSES.IDLE;
//                 state.error = null;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//             })
//             // Fetch user data
//             .addCase(fetchUserData.pending, (state) => {
//                 state.status = STATUSES.LOADING;
//             })
//             .addCase(fetchUserData.fulfilled, (state, action) => {
//                 state.data = action.payload;
//                 state.status = STATUSES.IDLE;
//                 state.error = null;
//             })
//             .addCase(fetchUserData.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//             })
//             // Update profile
//             .addCase(updateUserProfile.fulfilled, (state, action) => {
//                 state.data = action.payload;
//                 state.status = STATUSES.IDLE;
//                 state.error = null;
//
//                 // Update localStorage
//                 if (typeof window !== 'undefined') {
//                     localStorage.setItem('user', JSON.stringify(action.payload));
//                 }
//             })
//             .addCase(updateUserProfile.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//                 state.error = action.payload;
//             });
//     },
// });
//
// export const { logoutUser, setToken, clearError, loadFromStorage } = userSlice.actions;
// export default userSlice.reducer;
// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
    SUCCEEDED: 'succeeded',
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

export const googleLogin = createAsyncThunk(
    'user/googleLogin',
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/google/login', { email });

            // Store token in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Google login failed');
        }
    }
);

export const googleRegister = createAsyncThunk(
    'user/googleRegister',
    async ({ name, email, profile }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/google/register', { name, email, profile });

            // Store token in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Google registration failed');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            const response = await axios.put('/api/users/profile', { ...userData, token });

            // Update localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Update failed');
        }
    }
);

export const uploadProfilePicture = createAsyncThunk(
    'user/uploadProfilePicture',
    async (formData, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            // Add token to formData
            const uploadData = new FormData();
            uploadData.append('token', token);
            uploadData.append('profilePic', formData.get('profilePic'));

            const response = await axios.post('/api/users/profile', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.filePath;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Upload failed');
        }
    }
);

const initialState = {
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
        setToken: (state, action) => {
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
                        state.data = JSON.parse(user);
                    } catch (error) {
                        console.error('Failed to parse user from localStorage:', error);
                        // Clear corrupted data
                        localStorage.removeItem('user');
                    }
                }
                state.isInitialized = true;
            }
        },
        updateUserData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
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
                state.error = action.payload;
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
                state.error = action.payload;
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
                state.error = action.payload;
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
                state.error = action.payload;
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
                state.error = action.payload;
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
                state.error = action.payload;
                state.isLoading = false;
            })
            // Upload profile picture
            .addCase(uploadProfilePicture.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.isLoading = true;
            })
            .addCase(uploadProfilePicture.fulfilled, (state, action) => {
                state.data.pfp = action.payload;
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
                state.error = action.payload;
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