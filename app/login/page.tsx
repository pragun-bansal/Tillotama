// import React from 'react'
// import LoginCard from '@/components/login/LoginCard'
//
// const LoginHome = () => {
//     return (
//         <div className='bg-white'>
//             <LoginCard />
//         </div>
//     )
// }
//
// export default LoginHome
// File: app/login/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/redux';
import LoginCard from '@/components/login/LoginCard';

const LoginHome = () => {
    const router = useRouter();
    const { isAuthenticated, isInitialized, isLoading } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            console.log('👤 User already authenticated, redirecting...');
            router.push('/'); // Redirect to home or dashboard
        }
    }, [isAuthenticated, isInitialized, router]);

    // Show loading while checking authentication
    if (!isInitialized || isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Don't render login form if user is authenticated
    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-white'>
            <LoginCard />
        </div>
    );
};

export default LoginHome;