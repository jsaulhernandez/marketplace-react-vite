import { ProductModel } from '@interfaces/Product.model';
import { SaleDetailModel } from '@interfaces/SaleDetail.model';

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

/**
 * Check whether the product is in the cart or not
 * @param product producto a verificar si existe
 * @param saleDetails listado del carrito de compras
 * @returns retorna true o false
 */
export const existsProductInCart = (
    product?: ProductModel,
    saleDetails?: SaleDetailModel[],
): boolean => {
    if (!product) return false;
    if (!saleDetails) return false;
    if (saleDetails.length === 0) return false;

    return !!saleDetails.find((sd) => sd.product?.id === product.id);
};
