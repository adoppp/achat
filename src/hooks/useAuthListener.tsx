import { useEffect } from 'react';

import { auth } from '@/firebase';
import { setGuest, setLoading, setUser } from '@/redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { errorHelper } from '../utils/errorHelper';
import { resetError } from '@/redux/reducers/errorSlice';

export const useAuthListener = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.error)

    useEffect(() => {
        dispatch(setLoading());

        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                // reset all errors when auth state changed, need mb to create a [key (auth, user, global, messages, chats, ...)]: { /current error state/}. than check woulod be => if (error['user'] && error['user'].title && error['user'].message) ...
                if (error.title && error.message) {
                    dispatch(resetError());
                }

                if (currentUser) {
                    dispatch(
                        setUser({
                            id: currentUser.uid,
                            username: currentUser.displayName ?? '',
                            lastSeen: Date.now(),
                            email: currentUser.email,
                            phone: currentUser.phoneNumber,
                        }),
                    );
                } else {
                    dispatch(setGuest());
                }
            },
            (err: unknown) => {
                errorHelper(dispatch, err, 'Authentication Error');
                dispatch(setGuest());
            },
        );

        return () => unsubscribe();
    }, [dispatch]);
};
