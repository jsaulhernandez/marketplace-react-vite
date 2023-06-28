import { UserModel } from '@interfaces/User.model';

export interface StateUserModel {
    data?: UserModel;
    isLoggedIn?: boolean;
}
