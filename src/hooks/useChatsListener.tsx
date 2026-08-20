import { auth } from "@/firebase";
import { setChats, setChatsLoading } from "@/redux/reducers/chatsSlice";
import { setError } from "@/redux/reducers/errorSlice";
import { useAppDispatch, 
    // useAppSelector 
} from "@/redux/redux.hooks"
import { getChatsByUser } from "@/services/auth.service";
import { useEffect } from "react";

export const useChatsListener = () => {
    const dispatch = useAppDispatch();
    // const error = useAppSelector(state => state.error);

    useEffect(() => {
        dispatch(setChatsLoading('loading'));
        
        const unsubscribe = getChatsByUser((chats) => {
            try {
                dispatch(setChats(chats));
                dispatch(setChatsLoading('success'));
            } catch (error) {
                dispatch(setChatsLoading('error'));
                dispatch(setError({
                    title: 'Chats error',
                    message: 'Can not to load chats'
                }));
            }
        });

        return () => unsubscribe();
    }, [dispatch, auth])
}