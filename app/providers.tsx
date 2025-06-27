// // // 'use client';
// // //
// // // import { Provider } from 'react-redux';
// // // import { store } from '../store';
// // // import { useEffect } from 'react';
// // // import { useDispatch } from 'react-redux';
// // // import { loadFromStorage } from '../store/slices/userSlice';
// // //
// // // function ReduxProvider({ children }) {
// // //     return (
// // //         <Provider store={store}>
// // //             <InitializeApp>
// // //                 {children}
// // //             </InitializeApp>
// // //         </Provider>
// // //     );
// // // }
// // //
// // // function InitializeApp({ children }) {
// // //     const dispatch = useDispatch();
// // //
// // //     useEffect(() => {
// // //         // Load user data from localStorage on app initialization
// // //         dispatch(loadFromStorage());
// // //     }, [dispatch]);
// // //
// // //     return children;
// // // }
// // //
// // // export { ReduxProvider as Providers };
// // 'use client';
// //
// // import { Provider } from 'react-redux';
// // import { store } from '../store';
// // import { useEffect } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { loadFromStorage } from '../store/slices/userSlice';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { GoogleOAuthProvider } from '@react-oauth/google';
// //
// //
// // function ReduxProvider({ children }: { children: React.ReactNode }) {
// //     return (
// //         <Provider store={store}>
// //             <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
// //             <InitializeApp>
// //
// //                 {children}
// //                 <ToastContainer />
// //             </InitializeApp>
// //             </GoogleOAuthProvider>
// //         </Provider>
// //     );
// // }
// //
// // function InitializeApp({ children }: { children: React.ReactNode }) {
// //     const dispatch = useDispatch();
// //
// //     useEffect(() => {
// //         // Load user data from localStorage on app initialization
// //         dispatch(loadFromStorage());
// //     }, [dispatch]);
// //
// //     return <>{children}</>;
// // }
// //
// // export { ReduxProvider as Providers };
// 'use client';
//
// import { Provider } from 'react-redux';
// import { store } from '../store';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadFromStorage } from '../store/slices/userSlice';
// import { fetchCartData } from '../store/slices/cartSlice';
// import { fetchWishlistData } from '../store/slices/wishlistSlice';
// import { fetchAllProducts } from '../store/slices/allProductSlice';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import type { RootState, AppDispatch } from '../store';
//
// function ReduxProvider({ children }: { children: React.ReactNode }) {
//     return (
//         <Provider store={store}>
//             <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
//                 <InitializeApp>
//                     {children}
//                     <ToastContainer />
//                 </InitializeApp>
//             </GoogleOAuthProvider>
//         </Provider>
//     );
// }
//
// function InitializeApp({ children }: { children: React.ReactNode }) {
//     const dispatch = useDispatch<AppDispatch>();
//     const { isAuthenticated, isInitialized, token } = useSelector((state: RootState) => state.user);
//     const { status: cartStatus } = useSelector((state: RootState) => state.cart);
//     const { status: wishlistStatus } = useSelector((state: RootState) => state.wishlist);
//     const { status: productsStatus } = useSelector((state: RootState) => state.allProducts);
//
//     useEffect(() => {
//         console.log('🚀 Initializing app...');
//
//         // Initialize app data
//         const initializeApp = async () => {
//             try {
//                 // Step 1: Load user data from localStorage first
//                 console.log('📱 Loading user from storage...');
//                 dispatch(loadFromStorage());
//
//             } catch (error) {
//                 console.error('❌ App initialization error:', error);
//             }
//         };
//
//         // Only run on client side
//         if (typeof window !== 'undefined') {
//             initializeApp();
//         }
//     }, [dispatch]);
//
//     // Second useEffect: Load user-specific data when authentication state changes
//     useEffect(() => {
//         if (isInitialized) {
//             console.log('🔐 User initialized, loading data...', { isAuthenticated, token: !!token });
//
//             const loadUserData = async () => {
//                 try {
//                     if (isAuthenticated && token) {
//                         console.log('👤 Loading authenticated user data...');
//
//                         // Load cart if not already loaded
//                         if (cartStatus === 'idle') {
//                             console.log('🛒 Loading cart...');
//                             await dispatch(fetchCartData());
//                         }
//
//                         // Load wishlist if not already loaded
//                         if (wishlistStatus === 'idle') {
//                             console.log('❤️ Loading wishlist...');
//                             await dispatch(fetchWishlistData());
//                         }
//                     }
//
//                     // Always load products (public data) if not already loaded
//                     if (productsStatus === 'idle') {
//                         console.log('📦 Loading products...');
//                         await dispatch(fetchAllProducts());
//                     }
//
//                 } catch (error) {
//                     console.error('❌ User data loading error:', error);
//                 }
//             };
//
//             loadUserData();
//         }
//     }, [dispatch, isInitialized, isAuthenticated, token, cartStatus, wishlistStatus, productsStatus]);
//
//     // Debug logging
//     useEffect(() => {
//         console.log('🔍 App State:', {
//             userInitialized: isInitialized,
//             authenticated: isAuthenticated,
//             hasToken: !!token,
//             cartStatus,
//             wishlistStatus,
//             productsStatus
//         });
//     }, [isInitialized, isAuthenticated, token, cartStatus, wishlistStatus, productsStatus]);
//
//     return <>{children}</>;
// }
//
// export { ReduxProvider as Providers };
'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromStorage } from '../store/slices/userSlice';
import { fetchCartData } from '../store/slices/cartSlice';
import { fetchWishlistData } from '../store/slices/wishlistSlice';
import { fetchAllProducts } from '../store/slices/allProductSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { RootState, AppDispatch } from '../store';

function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                <InitializeApp>
                    {children}
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </InitializeApp>
            </GoogleOAuthProvider>
        </Provider>
    );
}

function InitializeApp({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    // User state
    const { isAuthenticated, isInitialized, token } = useSelector((state: RootState) => state.user);

    // Cart state
    const { status: cartStatus } = useSelector((state: RootState) => state.cart);

    // wishlist state
    const { status: wishlistStatus } = useSelector((state: RootState) => state.wishlist);

    // Products state
    const { status: productsStatus } = useSelector((state: RootState) => state.allProducts);

    // First useEffect: Initialize user data from localStorage
    useEffect(() => {
        console.log('🚀 App initialization started...');

        const initializeApp = async () => {
            try {
                // Only run on client side
                if (typeof window !== 'undefined') {
                    console.log('📱 Loading user from localStorage...');
                    dispatch(loadFromStorage());
                }
            } catch (error) {
                console.error('❌ App initialization error:', error);
            }
        };

        initializeApp();
    }, [dispatch]);

    // Second useEffect: Load data after user initialization
    useEffect(() => {
        if (!isInitialized) {
            console.log('⏳ Waiting for user initialization...');
            return;
        }

        console.log('🔐 User initialized, loading app data...', {
            isAuthenticated,
            hasToken: !!token,
            cartStatus,
            wishlistStatus,
            productsStatus
        });

        const loadAppData = async () => {
            try {
                // Always load products (public data) first
                if (productsStatus === 'idle') {
                    console.log('📦 Loading products...');
                    await dispatch(fetchAllProducts()).unwrap();
                }

                // Load user-specific data if authenticated
                if (isAuthenticated && token) {
                    console.log('👤 Loading authenticated user data...');

                    // Load cart data
                    if (cartStatus === 'idle') {
                        console.log('🛒 Loading cart...');
                        try {
                            await dispatch(fetchCartData()).unwrap();
                            console.log('✅ Cart loaded successfully');
                        } catch (error) {
                            console.warn('⚠️ Cart loading failed (might be empty):', error);
                        }
                    }

                    // Load wishlist data
                    if (wishlistStatus === 'idle') {
                        console.log('❤️ Loading wishlist...');
                        try {
                            await dispatch(fetchWishlistData()).unwrap();
                            console.log('✅ wishlist loaded successfully');
                        } catch (error) {
                            console.warn('⚠️ wishlist loading failed (might be empty):', error);
                        }
                    }
                } else {
                    console.log('🔓 User not authenticated, skipping user-specific data');
                }

            } catch (error) {
                console.error('❌ Data loading error:', error);
            }
        };

        loadAppData();
    }, [
        dispatch,
        isInitialized,
        isAuthenticated,
        token,
        cartStatus,
        wishlistStatus,
        productsStatus
    ]);

    // Debug state changes
    useEffect(() => {
        const debugInfo = {
            userInitialized: isInitialized,
            authenticated: isAuthenticated,
            hasToken: !!token,
            cartStatus,
            wishlistStatus,
            productsStatus,
            timestamp: new Date().toISOString(),
        };

        console.log('🔍 App State Update:', debugInfo);
    }, [isInitialized, isAuthenticated, token, cartStatus, wishlistStatus, productsStatus]);

    // Loading states
    const isLoadingUser = !isInitialized;
    const isLoadingData = (
        productsStatus === 'loading' ||
        (isAuthenticated && (cartStatus === 'loading' || wishlistStatus === 'loading'))
    );

    return (
        <>
            {/* Optional: Show loading indicator */}
            {isLoadingUser && (
                <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Initializing app...</p>
                    </div>
                </div>
            )}

            {children}
        </>
    );
}

export { ReduxProvider as Providers };