import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Message } from "@/types/global.types";

interface MessagesState {
    byChatId: Record<string, Message[]>;
    loadingByChat: Record<string, 'loading' | 'success' | 'error'>;
}

const initialState: MessagesState = {
    byChatId: {},
    loadingByChat: {}
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<{ chatId: string; messages: Message[] }>) {
            const { chatId, messages } = action.payload;

            state.byChatId[chatId] = messages;
            state.loadingByChat[chatId] = 'success';
        },
        addMessage(state, action: PayloadAction<{ chatId: string; message: Message }>) {
            const { chatId, message } = action.payload;

            const list = state.byChatId[chatId] ?? (state.byChatId[chatId] = []);

            if (list.find(m => m.id === message.id)) return;

            list.push(message);
        },
        updateMessage(state, action: PayloadAction<{ chatId: string; message: Message }>) {
            const { chatId, message } = action.payload;

            const list = state.byChatId[chatId];
            if (!list) return;

            const index = list.findIndex(m => m.id === message.id);
            if (index === -1) return;

            list[index] = message;
        },
        removeMessage(state, action: PayloadAction<{ chatId: string; messageId: string }>) {
            const { chatId, messageId } = action.payload;

            const list = state.byChatId[chatId];
            if (!list) return;

            state.byChatId[chatId] = list.filter(m => m.id !== messageId);
        },
        setMessagesLoading(
        state,
        action: PayloadAction<{ chatId: string; status: 'loading' | 'success' | 'error' }>
        ) {
            const { chatId, status } = action.payload;
            state.loadingByChat[chatId] = status;
        },
        clearChatMessages(state, action: PayloadAction<string>) {
            delete state.byChatId[action.payload];
            delete state.loadingByChat[action.payload];
        },
        resetMessages(state) {
            state.byChatId = {};
            state.loadingByChat = {};
        }
    }
});

export const messagesReducer = messagesSlice.reducer;
export const {
  setMessages,
  addMessage,
  updateMessage,
  removeMessage,
  setMessagesLoading,
  clearChatMessages,
  resetMessages
} = messagesSlice.actions;