import type { Chat } from "@/types/global.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChatsState {
    items: Record<string, Chat>;
    activeChatId: string | null;
    loading: 'loading' | 'success' | 'error';
    readsByChat: Record<string, Record<string, number>>;
};

const initialState: ChatsState = {
    items: {},
    activeChatId: null,
    loading: 'loading',
    readsByChat: {}
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
            delete state.readsByChat[action.payload]

            if (state.activeChatId === action.payload) {
                state.activeChatId = null;
            }
        },
        setRead(
            state,
            action: PayloadAction<{ chatId: string; userId: string; lastReadAt: number }>
        ) {
            const { chatId, userId, lastReadAt } = action.payload;

            if (!state.readsByChat[chatId]) {
                state.readsByChat[chatId] = {};
            }

            state.readsByChat[chatId][userId] = lastReadAt;
        }
    }
});

export const chatsReducer = chatsSlice.reducer;
export const {
    setChats,
    setActiveChat,
    setChatsLoading,
    updateChat,
    removeChat,
    setRead
} = chatsSlice.actions;