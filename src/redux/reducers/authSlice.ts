import type { User } from "@/types/global.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
    status: 'loading' | 'guest' | 'authenticated';
};

const initialState: AuthState = {
    status: 'loading',
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setGuest(state) {
            state.user = null;
            state.status = 'guest';
        },
        setLoading(state) {
            state.user = null;
            state.status = 'loading';
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.status = 'authenticated'
        }
    }
});

export const authReducer = authSlice.reducer;
export const { 
    setGuest, 
    setLoading, 
    setUser 
} = authSlice.actions;