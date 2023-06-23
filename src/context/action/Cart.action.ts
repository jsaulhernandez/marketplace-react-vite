import { SaleDetailModel } from '@interfaces/SaleDetail.model';

export enum CartActionType {
    ADD = 'ADD',
    UPDATE_QUANTITY = 'UPDATE_QUANTITY',
    REMOVE = 'REMOVE',
    CLEAN = 'CLEAN',
}
export interface CartAction {
    type: CartActionType;
    payload?: SaleDetailModel;
}
