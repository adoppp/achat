import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/store/slices/authSlice';
import { loaderReducer } from '@/store/slices/loaderSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        loader: loaderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;