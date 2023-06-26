import { PaymentMethodModel } from './PaymentMethod.model';
import { SaleDetailModel } from './SaleDetail.model';

export interface SaleModel {
    id?: number;
    shippingCost: number;
    tax: number;
    paymentMethod?: PaymentMethodModel;
    user?: string;
    detail?: SaleDetailModel[];
}
