import { useContext } from 'react';

import { CartContext } from '@context/CartContext.context';
import { CartActionType } from '@context/action/Cart.action';

import { SaleDetailModel } from '@interfaces/SaleDetail.model';

export const useCart = () => {
    const { state, dispatch } = useContext(CartContext);

    const onAddProduct = (payload: SaleDetailModel) => {
        dispatch({
            type: CartActionType.ADD,
            payload: payload,
        });
    };

    const onRemoveProduct = (payload: SaleDetailModel) => {
        dispatch({
            type: CartActionType.REMOVE,
            payload: payload,
        });
    };

    const onClean = () => {
        dispatch({
            type: CartActionType.CLEAN,
        });
    };

    return {
        ...state,
        methods: {
            onAddProduct,
            onRemoveProduct,
            onClean,
        },
    };
};
