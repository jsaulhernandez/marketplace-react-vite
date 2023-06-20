import { CartAction } from '@context/action/Cart.action';
import { StateCartModel } from '@context/state/Cart.state';

const CardReducer = (state: StateCartModel, action: CartAction): StateCartModel => {
    switch (action.type) {
        case 'ADD':
            if (
                !state.saleDetails?.find(
                    (item) => item.product.id === action.payload.detail.product.id,
                )
            ) {
                state.saleDetails?.push(action.payload?.detail);
            }
            return {
                ...state,
                saleDetails: [...state.saleDetails],
            };

        case 'REMOVE':
            return {
                ...state,
                saleDetails: [
                    ...state.saleDetails.filter(
                        (item) => item.product.id !== action.payload.detail.product.id,
                    ),
                ],
            };

        case 'TOTAL_PAY':
            return {
                ...state,
                subTotal: state.saleDetails.reduce(
                    (subTotal, item) => subTotal + item.price * item.quantity,
                    0,
                ),
            };

        case 'CLEAN':
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
