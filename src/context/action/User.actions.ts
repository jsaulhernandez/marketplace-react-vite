import { StateUserModel } from '@context/state/User.state';

export enum UserActionType {
    LOGIN = 'LOGIN',
    UPDATE = 'UPDATE',
    LOGOUT = 'LOGOUT',
}

export interface UserAction {
    type: UserActionType;
    payload?: StateUserModel;
}
