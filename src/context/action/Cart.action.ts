import { SaleDetailModel } from '@interfaces/SaleDetail.model';

export enum CartActionType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    CLEAN = 'CLEAN',
}
export interface CartAction {
    type: CartActionType;
    payload?: SaleDetailModel;
}
