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
