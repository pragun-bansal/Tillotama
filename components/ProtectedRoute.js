// components/ProtectedRoute.js
'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { data: user, token } = useAppSelector((state) => state.user);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        if (adminOnly && !user?.admin) {
            router.push('/unauthorized');
            return;
        }

        setIsLoading(false);
    }, [token, user, adminOnly, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!token || (adminOnly && !user?.admin)) {
        return null;
    }

    return children;
}