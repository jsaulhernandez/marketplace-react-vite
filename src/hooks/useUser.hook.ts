import { useContext } from 'react';

import { UserContext } from '@context/UserContext.context';
import { UserActionType } from '@context/action/User.actions';

import { UserModel } from '@interfaces/User.model';

export const useUser = () => {
    const { state, dispatch } = useContext(UserContext);

    const onLogin = (data?: UserModel) => {
        dispatch({
            type: UserActionType.LOGIN,
            payload: {
                data,
                isLoggedIn: true,
            },
        });
    };

    const onUpdateInformation = (data?: UserModel, isLoggedIn?: boolean) => {
        dispatch({
            type: UserActionType.UPDATE,
            payload: {
                data,
                isLoggedIn,
            },
        });
    };

    const onLogout = () => {
        dispatch({ type: UserActionType.LOGOUT });
    };

    return {
        ...state,
        methods: {
            onLogin,
            onUpdateInformation,
            onLogout,
        },
    };
};
