import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SerializedUser {
  uid: string | null; 
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isInitialized: boolean;
}

interface inititalStateType {
    user: SerializedUser;
};

const initialState: inititalStateType = {
    user: {
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        isInitialized: false,
    },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SerializedUser>) => { 
        state.user = { ...action.payload, isInitialized: true }; 
    },
    clearUser: (state) => { 
        state.user = {
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            isInitialized: true,
        }; 
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;