// // store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import userSlice from './slices/userSlice';
// import cartSlice from './slices/cartSlice';
// import wishlistSlice from './slices/wishlistSlice';
// import allProductSlice from './slices/allProductSlice';
//
// const makeStore = () =>
//     configureStore({
//         reducer: {
//             user: userSlice,
//             cart: cartSlice,
//             wishlist: wishlistSlice,
//             allProducts: allProductSlice,
//         },
//         middleware: (getDefaultMiddleware) =>
//             getDefaultMiddleware({
//                 serializableCheck: {
//                     ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//                 },
//             }),
//         devTools: process.env.NODE_ENV !== 'production',
//     });
//
// export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';
import allProductSlice from './slices/allProductSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
        allProducts: allProductSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;