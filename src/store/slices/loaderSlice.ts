import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
    isLoading: boolean;
};

const initialState: InitialStateType = {
    isLoading: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        clearLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { setLoading, clearLoading } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;