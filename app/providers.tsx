'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadFromStorage } from '../store/slices/userSlice';

function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            <InitializeApp>
                {children}
            </InitializeApp>
        </Provider>
    );
}

function InitializeApp({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Load user data from localStorage on app initialization
        dispatch(loadFromStorage());
    }, [dispatch]);

    return children;
}

export { ReduxProvider as Providers };