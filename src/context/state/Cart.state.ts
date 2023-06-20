import { SaleDetailModel } from '@interfaces/SaleDetail.model';

export interface StateCartModel {
    saleDetails: SaleDetailModel[];
    subTotal: number;
}
