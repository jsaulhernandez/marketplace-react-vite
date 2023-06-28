import { Dispatch, FC, ReactNode, createContext, useReducer } from 'react';

import { StateUserModel } from './state/User.state';
import { UserAction } from './action/User.actions';

import { UserReducer } from '@reducers/UserReducer.reducer';

const initialState: StateUserModel = {
    data: undefined,
    isLoggedIn: false,
};

interface UserContextModel {
    state: StateUserModel;
    dispatch: Dispatch<UserAction>;
}

export const UserContext = createContext<UserContextModel>({
    dispatch: (value: UserAction) => {},
    state: initialState,
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = (props) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    );
};
