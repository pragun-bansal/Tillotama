import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    IconSearch,
    IconTrash,
    IconShield,
    IconShieldOff,
    IconUser,
    IconMail,
    IconPhone,
    IconMapPin
} from '@tabler/icons-react';
import { useAdminUsers } from '@/hooks/useAdmin';

const UserCard = ({ user, onDelete, onToggleAdmin, isCurrentUser }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDelete = () => {
        if (isCurrentUser) {
            alert("You cannot delete your own account!");
            return;
        }
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            onDelete(user._id);
        }
    };

    const handleToggleAdmin = () => {
        if (isCurrentUser && user.admin) {
            alert("You cannot remove admin privileges from your own account!");
            return;
        }
        const action = user.admin ? 'remove admin privileges from' : 'make admin';
        if (window.confirm(`Are you sure you want to ${action} ${user.name}?`)) {
            onToggleAdmin(user._id, !user.admin);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={user.pfp || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {user.name} {user.lastName}
                                {isCurrentUser && (
                                    <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">(You)</span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                @{user.username || 'No username'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {user.admin && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                Admin
                            </span>
                        )}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <svg
                                className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <IconMail size={16} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{user.email || 'No email'}</span>
                    </div>

                    {user.phoneNumber && (
                        <div className="flex items-center space-x-2 text-sm">
                            <IconPhone size={16} className="text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">{user.phoneNumber}</span>
                        </div>
                    )}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3"
                    >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-900 dark:text-white">Gender:</span>
                                <p className="text-gray-600 dark:text-gray-400">{user.gender || 'Not specified'}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-900 dark:text-white">Phone:</span>
                                <p className="text-gray-600 dark:text-gray-400">{user.phoneNumber || 'Not provided'}</p>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div>
                            <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                                <IconMapPin size={16} />
                                Address:
                            </span>
                            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <p>{user.addressLine1 || 'Address Line 1 not provided'}</p>
                                {user.addressLine2 && <p>{user.addressLine2}</p>}
                                <p>
                                    {user.town && `${user.town}, `}
                                    {user.city || 'City not provided'}
                                    {user.pinCode && ` - ${user.pinCode}`}
                                </p>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-900 dark:text-white">Account Type:</span>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {user.admin ? 'Administrator' : 'Regular User'}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-900 dark:text-white">Joined:</span>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleToggleAdmin}
                        disabled={isCurrentUser && user.admin}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            user.admin
                                ? 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800'
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'
                        } ${isCurrentUser && user.admin ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {user.admin ? <IconShieldOff size={16} /> : <IconShield size={16} />}
                        <span>{user.admin ? 'Remove Admin' : 'Make Admin'}</span>
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isCurrentUser}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors ${
                            isCurrentUser ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <IconTrash size={16} />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const AdminUsers = () => {
    const {
        users,
        filteredUsers,
        searchTerm,
        loading,
        error,
        fetchUsers,
        deleteUser,
        makeAdmin,
        removeAdmin,
        setSearchTerm,
        clearError
    } = useAdminUsers();

    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
        // Get current user ID from localStorage or context
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setCurrentUserId(user._id);
            } catch (err) {
                console.error('Failed to parse user data:', err);
            }
        }
    }, [fetchUsers]);

    const handleSearch = () => {
        fetchUsers(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleToggleAdmin = async (userId, makeUserAdmin) => {
        try {
            if (makeUserAdmin) {
                await makeAdmin(userId);
            } else {
                await removeAdmin(userId);
            }
        } catch (err) {
            console.error('Failed to toggle admin status:', err);
            alert('Failed to update admin status. Please try again.');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
        } catch (err) {
            console.error('Failed to delete user:', err);
            alert('Failed to delete user. Please try again.');
        }
    };

    const stats = {
        total: users.length,
        admins: users.filter(user => user.admin).length,
        regular: users.filter(user => !user.admin).length,
        withPhone: users.filter(user => user.phoneNumber).length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Users Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage user accounts and permissions
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by email, name, or username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
                >
                    <IconSearch size={20} />
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                        <IconUser className="h-8 w-8 text-blue-500" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                        <IconShield className="h-8 w-8 text-purple-500" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.admins}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                        <IconUser className="h-8 w-8 text-green-500" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Regular Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.regular}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                        <IconPhone className="h-8 w-8 text-orange-500" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">With Phone</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.withPhone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={clearError}
                        className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
                    >
                        <IconUser size={20} />
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Loading users...</span>
                </div>
            )}

            {/* Users Grid */}
            <div className="space-y-4">
                {filteredUsers.length === 0 && !loading ? (
                    <div className="text-center py-12">
                        <IconUser size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {searchTerm ? 'No users found' : 'No users to display'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {searchTerm
                                ? 'Try adjusting your search terms or search for users'
                                : 'Use the search bar above to find users'
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => fetchUsers()}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
                            >
                                Load All Users
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredUsers.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                onDelete={handleDeleteUser}
                                onToggleAdmin={handleToggleAdmin}
                                isCurrentUser={user._id === currentUserId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;