import { CartAction, CartActionType } from '@context/action/Cart.action';
import { StateCartModel } from '@context/state/Cart.state';

import { getSubTotalCart } from '@utils/Numbers.utils';

const CardReducer = (state: StateCartModel, action: CartAction): StateCartModel => {
    switch (action.type) {
        case CartActionType.ADD:
            if (action.payload) {
                if (
                    !state.saleDetails?.find(
                        (item) => item.product?.id === action.payload?.product?.id,
                    )
                )
                    state.saleDetails?.push(action.payload);

                return {
                    ...state,
                    saleDetails: [...state.saleDetails],
                    subTotal: getSubTotalCart([...state.saleDetails]),
                };
            }

            return {
                ...state,
            };

        case CartActionType.REMOVE:
            state.saleDetails = state.saleDetails.filter(
                (item) => item.product?.id !== action.payload?.product?.id,
            );

            return {
                ...state,
                saleDetails: [...state.saleDetails],
                subTotal: getSubTotalCart([...state.saleDetails]),
            };

        case CartActionType.UPDATE_QUANTITY:
            if (action.payload) {
                state.saleDetails = state.saleDetails.map((d) => {
                    if (d.product?.id === action.payload?.product?.id) {
                        return {
                            ...d,
                            quantity: action.payload?.quantity ?? d.quantity,
                        };
                    }

                    return d;
                });

                return {
                    ...state,
                    saleDetails: [...state.saleDetails],
                    subTotal: getSubTotalCart([...state.saleDetails]),
                };
            }

            return {
                ...state,
            };

        case CartActionType.CLEAN:
            return {
                ...state,
                saleDetails: [],
                subTotal: 0,
            };

        default:
            return {
                ...state,
            };
    }
};

export default CardReducer;
