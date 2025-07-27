'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    updateUserProfile,
    uploadProfilePicture,
    clearError,
    fetchUserData,
    logoutUser
} from '@/store/slices/userSlice';
import { User as UserType } from '@/types';
import { toast } from 'react-toastify';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Save,
    X,
    Edit3,
    Shield,
    Settings,
    LogOut,
    Upload,
    Loader2,
    Check,
    AlertCircle,
    Heart,
    ShoppingBag
} from 'lucide-react';

interface ProfileFormData {
    name: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    gender: string;
    addressLine1: string;
    addressLine2: string;
    town: string;
    city: string;
    pinCode: string;
    allowTestimonialEmails: boolean;
}

const ProfilePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Redux state
    // const { data: user, isLoading, error, isAuthenticated, token } = useSelector((state: any) => ({
    //     data: state.user.data,
    //     isLoading: state.user.isLoading,
    //     error: state.user.error,
    //     isAuthenticated: state.user.isAuthenticated,
    //     token: state.user.token
    // }));
    const { data: user, isLoading, error, isAuthenticated, token } = useSelector((state: { user: { data: UserType | Record<string, never>, isLoading: boolean, error: string | null, isAuthenticated: boolean, token: string | null } }) => ({
        data: state.user.data,
        isLoading: state.user.isLoading,
        error: state.user.error,
        isAuthenticated: state.user.isAuthenticated,
        token: state.user.token
    }));

    // Local state
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({
        name: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        gender: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        city: '',
        pinCode: '',
        allowTestimonialEmails: true
    });
    const [isUploading, setIsUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('personal');
    const [hasChanges, setHasChanges] = useState(false);

    // Initialize form data when user data loads
    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setFormData({
                name: user.name || '',
                lastName: user.lastName || '',
                username: user.username || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                gender: user.gender || '',
                addressLine1: user.addressLine1 || '',
                addressLine2: user.addressLine2 || '',
                town: user.town || '',
                city: user.city || '',
                pinCode: user.pinCode || '',
                allowTestimonialEmails: user.allowTestimonialEmails ?? true
            });
        }
    }, [user]);

    // Check for authentication
    useEffect(() => {
        if (!isAuthenticated && !token) {
            router.push('/login');
            return;
        }

        // Fetch fresh user data if needed
        if (isAuthenticated && token && (!user || Object.keys(user).length === 0)) {
            // dispatch(fetchUserData(token));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch(fetchUserData(token) as any);
        }
    }, [isAuthenticated, token, user, dispatch, router]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
        setHasChanges(true);
    };

    // Handle profile picture upload
    const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        setIsUploading(true);
        try {
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Upload image
            const formData = new FormData();
            formData.append('profilePic', file);

            // await dispatch(uploadProfilePicture(formData)).unwrap();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await dispatch(uploadProfilePicture(formData) as any).unwrap();
            toast.success('Profile picture updated successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload profile picture');
            setPreviewImage(null);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasChanges) {
            setIsEditing(false);
            return;
        }

        try {
            // await dispatch(updateUserProfile(formData)).unwrap();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await dispatch(updateUserProfile(formData) as any).unwrap();
            toast.success('Profile updated successfully!');
            setIsEditing(false);
            setHasChanges(false);
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Failed to update profile');
        }
    };

    // Handle logout
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(logoutUser());
            router.push('/login');
        }
    };

    // Cancel editing
    const handleCancel = () => {
        if (hasChanges && !window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
            return;
        }

        // Reset form data
        if (user) {
            setFormData({
                name: user.name || '',
                lastName: user.lastName || '',
                username: user.username || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                gender: user.gender || '',
                addressLine1: user.addressLine1 || '',
                addressLine2: user.addressLine2 || '',
                town: user.town || '',
                city: user.city || '',
                pinCode: user.pinCode || '',
                allowTestimonialEmails: user.allowTestimonialEmails ?? true
            });
        }

        setIsEditing(false);
        setHasChanges(false);
        setPreviewImage(null);
    };

    // Clear error when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2">Redirecting to login...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                    <Image
                                        src={previewImage || user?.pfp || '/images/default-avatar.jpg'}
                                        alt="Profile"
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                {isEditing && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 bg-pink-600 text-white p-1 rounded-full hover:bg-pink-700 transition-colors"
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Camera className="w-4 h-4" />
                                        )}
                                    </button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {user?.name} {user?.lastName}
                                </h1>
                                <p className="text-gray-600">{user?.email}</p>
                                {user?.admin && (
                                    <div className="flex items-center mt-1">
                                        <Shield className="w-4 h-4 text-purple-600 mr-1" />
                                        <span className="text-sm text-purple-600 font-medium">Administrator</span>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                            <p className="text-red-800">{error}</p>
                            <button
                                onClick={() => dispatch(clearError())}
                                className="ml-auto text-red-600 hover:text-red-800"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'personal', label: 'Personal Info', icon: User },
                                { id: 'address', label: 'Address', icon: MapPin },
                                { id: 'settings', label: 'Settings', icon: Settings }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-pink-600 text-pink-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Personal Information Tab */}
                        {activeTab === 'personal' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                required
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Address Tab */}
                        {activeTab === 'address' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address Line 1
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Street address, apartment, suite, etc."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address Line 2
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Additional address information (optional)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Town
                                            </label>
                                            <input
                                                type="text"
                                                name="town"
                                                value={formData.town}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pin Code
                                            </label>
                                            <input
                                                type="text"
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Heart className="w-5 h-5 text-pink-600" />
                                            <div>
                                                <h4 className="font-medium text-gray-900">Testimonial Email Notifications</h4>
                                                <p className="text-sm text-gray-600">Receive emails about your testimonial updates</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="allowTestimonialEmails"
                                                checked={formData.allowTestimonialEmails}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                                        </label>
                                    </div>

                                    {/* Account Status */}
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-3">Account Status</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Account Type</span>
                                                <span className="text-sm font-medium text-green-600 flex items-center">
                                                    <Check className="w-4 h-4 mr-1" />
                                                    {user?.admin ? 'Administrator' : 'Regular User'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Email Verified</span>
                                                <span className="text-sm font-medium text-green-600 flex items-center">
                                                    <Check className="w-4 h-4 mr-1" />
                                                    Verified
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Member Since</span>
                                                <span className="text-sm text-gray-900">
                                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-pink-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Heart className="w-8 h-8 text-pink-600" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Testimonials</p>
                                                    <p className="text-xl font-bold text-gray-900">
                                                        {user?.testimonials?.length || 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-purple-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <ShoppingBag className="w-8 h-8 text-purple-600" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Orders</p>
                                                    <p className="text-xl font-bold text-gray-900">0</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                            >
                                <Edit3 className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleCancel}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !hasChanges}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                <span>Save Changes</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Save Button */}
                {!isEditing ?(
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                            >
                                <Edit3 className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                ):
                    (
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading || !hasChanges}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ProfilePage;