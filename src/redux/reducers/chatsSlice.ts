import type { Chat } from "@/types/global.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChatsState {
    items: Record<string, Chat>;
    activeChatId: string | null;
    loading: 'loading' | 'success' | 'error';
};

const initialState: ChatsState = {
    items: {},
    activeChatId: null,
    loading: 'loading'
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats(state, action: PayloadAction<Record<string, Chat>>) {
            state.items = action.payload;
            state.loading = 'success';
        },
        setActiveChat(state, action: PayloadAction<string | null>) {
            state.activeChatId = action.payload;
        },
        setChatsLoading(state, action: PayloadAction<'loading' | 'success' | 'error'>) {
            state.loading = action.payload;
        },
        updateChat(state, action: PayloadAction<Chat>) {
            state.items[action.payload.id] = action.payload;
        },
        removeChat(state, action: PayloadAction<string>) {
            delete state.items[action.payload];

            if (state.activeChatId === action.payload) {
                state.activeChatId = null;
            }
        }
    }
});

export const chatsReducer = chatsSlice.reducer;
export const {
    setChats,
    setActiveChat,
    setChatsLoading,
    updateChat,
    removeChat
} = chatsSlice.actions;