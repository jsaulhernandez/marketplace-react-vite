import { SaleDetailModel } from '@interfaces/SaleDetail.model';

/**
 *
 * @param value recibe un valor númerico, para formatearlo a dinero
 * @returns si @param value no viene definido retornara -- caso contrario un valor con formato $0.00
 */
export const formatMoney = (value?: number) => {
    if (!value) return '--';

    return new Intl.NumberFormat('en', {
        currencySign: 'accounting',
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

/**
 *
 * @param saleDetails arreglo de datos del carrito
 * @returns el subtotal de los productos agregados
 */
export const getSubTotalCart = (saleDetails: SaleDetailModel[]) => {
    return saleDetails.reduce(
        (subTotal, item) => subTotal + item.price * item.quantity,
        0,
    );
};
