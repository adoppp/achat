import { useEffect } from 'react';

import { subscribeAuth } from '@/services/auth.service';
import { setGuest, setLoading, setUser } from '@/redux/reducers/authSlice';
import { useAppDispatch } from '@/redux/redux.hooks';

export const useAuthListener = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setLoading());

        const unsub = subscribeAuth((user) => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(setGuest());
            }
        });

        return () => unsub();
    }, [dispatch]);
};
