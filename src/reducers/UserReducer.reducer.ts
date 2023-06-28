import { UserAction, UserActionType } from '@context/action/User.actions';
import { StateUserModel } from '@context/state/User.state';

export const UserReducer = (
    state: StateUserModel,
    action: UserAction,
): StateUserModel => {
    switch (action.type) {
        case UserActionType.LOGIN:
            return {
                ...state,
                data: action.payload?.data ?? state.data,
                isLoggedIn: true,
            };

        case UserActionType.UPDATE:
            return {
                ...state,
                data: action.payload?.data ?? state.data,
                isLoggedIn: action.payload?.isLoggedIn ?? state.isLoggedIn,
            };

        case UserActionType.LOGOUT:
            return {
                ...state,
                data: undefined,
                isLoggedIn: false,
            };

        default:
            return { ...state };
    }
};
