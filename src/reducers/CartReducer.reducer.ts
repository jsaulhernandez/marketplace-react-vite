import { CartAction, CartActionType } from '@context/action/Cart.action';
import { StateCartModel } from '@context/state/Cart.state';

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
                    subTotal: state.saleDetails.reduce(
                        (subTotal, item) => subTotal + item.price * item.quantity,
                        0,
                    ),
                };
            }

            return {
                ...state,
            };

        case CartActionType.REMOVE:
            return {
                ...state,
                saleDetails: [
                    ...state.saleDetails.filter(
                        (item) => item.product?.id !== action.payload?.product?.id,
                    ),
                ],
                subTotal: state.saleDetails
                    .filter((item) => item.product?.id !== action.payload?.product?.id)
                    .reduce((subTotal, item) => subTotal + item.price * item.quantity, 0),
            };

        case CartActionType.UPDATE_QUANTITY:
            if (action.payload) {
                state.saleDetails = state.saleDetails.map((d) => {
                    if (d.id === action.payload?.id) {
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
                    subTotal: state.saleDetails.reduce(
                        (subTotal, item) => subTotal + item.price * item.quantity,
                        0,
                    ),
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
