// pages/admin.js
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Head from 'next/head';

// Import your admin components (adjust paths as needed)
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminTestimonials from '@/components/admin/AdminTestimonials';

const AdminPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);

    // Get user data from Redux store
    const { user, isAuthenticated, isInitialized } = useSelector((state) => ({
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated,
        isInitialized: state.user.isInitialized,
    }));

    const isAdmin = user?.admin || false;
    const canAccessAdmin = isAuthenticated && isAdmin;

    // Handle navigation to home
    const handleNavigateHome = () => {
        router.push('/');
    };

    // Handle navigation to specific product pages
    const handleAddProduct = () => {
        // Adjust this path based on your routing structure
        router.push('/admin/products/new');
    };

    const handleEditProduct = (productId) => {
        // Adjust this path based on your routing structure
        router.push(`/admin/products/edit/${productId}`);
    };

    // Check authentication and redirect if necessary
    useEffect(() => {
        if (isInitialized) {
            setIsLoading(false);

            if (!isAuthenticated) {
                router.push('/login?redirect=/admin');
                return;
            }

            if (!isAdmin) {
                router.push('/');
                return;
            }
        }
    }, [isInitialized, isAuthenticated, isAdmin, router]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'products':
                return (
                    <AdminProducts
                        onAddProduct={handleAddProduct}
                        onEditProduct={handleEditProduct}
                    />
                );
            case 'users':
                return <AdminUsers />;
            case 'testimonials':
                return <AdminTestimonials />;
            default:
                return <AdminDashboard />;
        }
    };

    // Show loading state while checking permissions
    if (isLoading || !isInitialized) {
        return (
            <>
                <Head>
                    <title>Admin Panel - Loading...</title>
                </Head>
                <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Loading admin panel...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    // Show access denied if not authenticated or not admin
    if (!canAccessAdmin) {
        return (
            <>
                <Head>
                    <title>Access Denied</title>
                </Head>
                <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Access Denied
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You need admin privileges to access this page.
                        </p>
                        <button
                            onClick={handleNavigateHome}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Admin Panel - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</title>
                <meta name="description" content="Admin panel for managing users and products" />
            </Head>
            <AdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onNavigateHome={handleNavigateHome}
            >
                {renderContent()}
            </AdminLayout>
        </>
    );
};

export default AdminPage;