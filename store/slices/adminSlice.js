// store/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Admin-specific async thunks
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (searchTerm = '', { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            console.log('👨‍💼 Fetching users with search term:', searchTerm);
            const response = await axios.put(`/api/users/findUser/${searchTerm}`, { token });
            console.log('👨‍💼 Users fetch response:', response.data);

            return response.data || [];
        } catch (error) {
            console.error('👨‍💼 Users fetch error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            console.log('👨‍💼 Deleting user:', userId);
            await axios.delete(`/api/users/${userId}`, { data: { token } });

            return userId;
        } catch (error) {
            console.error('👨‍💼 Delete user error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
        }
    }
);

export const toggleUserAdmin = createAsyncThunk(
    'admin/toggleUserAdmin',
    async ({ userId, makeAdmin }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            if (!token) {
                return rejectWithValue('No authentication token found');
            }

            const endpoint = makeAdmin ? 'make-admin' : 'remove-admin';
            console.log('👨‍💼 Toggling admin status:', { userId, makeAdmin });

            await axios.put(`/api/users/${userId}/${endpoint}`, { token });

            return { userId, isAdmin: makeAdmin };
        } catch (error) {
            console.error('👨‍💼 Toggle admin error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Failed to update admin status');
        }
    }
);

const initialState = {
    // Users management
    users: [],
    filteredUsers: [],
    userSearchTerm: '',

    // Products management (reuse existing product slice)

    // Loading states
    usersLoading: false,

    // Error states
    usersError: null,

    // UI states
    activeTab: 'products', // 'products' | 'users'
    sidebarOpen: false,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },

        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },

        setUserSearchTerm: (state, action) => {
            state.userSearchTerm = action.payload;
            // Filter users based on search term
            if (action.payload.trim()) {
                const searchTerm = action.payload.toLowerCase();
                state.filteredUsers = state.users.filter(user =>
                    user.email?.toLowerCase().includes(searchTerm) ||
                    user.name?.toLowerCase().includes(searchTerm) ||
                    user.username?.toLowerCase().includes(searchTerm)
                );
            } else {
                state.filteredUsers = [...state.users];
            }
        },

        clearUsersError: (state) => {
            state.usersError = null;
        },

        updateUserInList: (state, action) => {
            const { userId, updates } = action.payload;
            const userIndex = state.users.findIndex(user => user._id === userId);
            if (userIndex !== -1) {
                state.users[userIndex] = { ...state.users[userIndex], ...updates };
                // Update filtered users as well
                const filteredIndex = state.filteredUsers.findIndex(user => user._id === userId);
                if (filteredIndex !== -1) {
                    state.filteredUsers[filteredIndex] = { ...state.filteredUsers[filteredIndex], ...updates };
                }
            }
        },

        removeUserFromList: (state, action) => {
            const userId = action.payload;
            state.users = state.users.filter(user => user._id !== userId);
            state.filteredUsers = state.filteredUsers.filter(user => user._id !== userId);
        },
    },

    extraReducers: (builder) => {
        builder
            // Fetch all users
            .addCase(fetchAllUsers.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload || [];
                state.filteredUsers = action.payload || [];
                state.usersLoading = false;
                state.usersError = null;
                console.log('👨‍💼 Users loaded successfully:', state.users.length);
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload;
                console.error('👨‍💼 Users load failed:', action.payload);
            })

            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const userId = action.payload;
                state.users = state.users.filter(user => user._id !== userId);
                state.filteredUsers = state.filteredUsers.filter(user => user._id !== userId);
                state.usersLoading = false;
                state.usersError = null;
                console.log('👨‍💼 User deleted successfully:', userId);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload;
                console.error('👨‍💼 User deletion failed:', action.payload);
            })

            // Toggle user admin status
            .addCase(toggleUserAdmin.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(toggleUserAdmin.fulfilled, (state, action) => {
                const { userId, isAdmin } = action.payload;
                const userIndex = state.users.findIndex(user => user._id === userId);
                if (userIndex !== -1) {
                    state.users[userIndex].admin = isAdmin;
                }
                const filteredIndex = state.filteredUsers.findIndex(user => user._id === userId);
                if (filteredIndex !== -1) {
                    state.filteredUsers[filteredIndex].admin = isAdmin;
                }
                state.usersLoading = false;
                state.usersError = null;
                console.log('👨‍💼 User admin status updated:', { userId, isAdmin });
            })
            .addCase(toggleUserAdmin.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload;
                console.error('👨‍💼 Admin status update failed:', action.payload);
            });
    },
});

export const {
    setActiveTab,
    setSidebarOpen,
    setUserSearchTerm,
    clearUsersError,
    updateUserInList,
    removeUserFromList,
} = adminSlice.actions;

// Selectors
export const selectUsers = (state) => state.admin.users;
export const selectFilteredUsers = (state) => state.admin.filteredUsers;
export const selectUserSearchTerm = (state) => state.admin.userSearchTerm;
export const selectUsersLoading = (state) => state.admin.usersLoading;
export const selectUsersError = (state) => state.admin.usersError;
export const selectActiveTab = (state) => state.admin.activeTab;
export const selectSidebarOpen = (state) => state.admin.sidebarOpen;

export default adminSlice.reducer;

// Updated store/index.tsx - Add admin slice
// Add this import to your existing store/index.tsx:
// import adminSlice from './slices/adminSlice';

// Add to your reducer configuration:
// admin: adminSlice,

// Add to your exports:
// export {
//     fetchAllUsers,
//     deleteUser,
//     toggleUserAdmin,
//     setActiveTab,
//     setSidebarOpen,
//     setUserSearchTerm,
//     clearUsersError,
//     updateUserInList,
//     removeUserFromList,
// } from './slices/adminSlice';

// export {
//     selectUsers,
//     selectFilteredUsers,
//     selectUserSearchTerm,
//     selectUsersLoading,
//     selectUsersError,
//     selectActiveTab,
//     selectSidebarOpen,
// } from './slices/adminSlice';