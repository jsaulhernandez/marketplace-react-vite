import { CustomerModel } from './Customer.model';
export interface UserModel {
    id?: number;
    email: string;
    password: string;
    status: number;
    createdAt: number;
    updatedAt: number;
    verifiedEmail?: number;
    customer?: CustomerModel;
}
