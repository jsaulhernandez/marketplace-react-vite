import { SaleDetailModel } from '@interfaces/SaleDetail.model';

export enum CartActionType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    TOTAL_PAY = 'TOTAL_PAY',
    CLEAN = 'CLEAN',
}
export interface CartAction {
    type: CartActionType;
    payload: {
        detail: SaleDetailModel;
    };
}
