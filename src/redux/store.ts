import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/redux/reducers/authSlice";
import { chatsReducer } from "@/redux/reducers/chatsSlice";
import { messagesReducer } from "@/redux/reducers/messagesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chats: chatsReducer,
        messages: messagesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;