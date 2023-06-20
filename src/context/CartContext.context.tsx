import { Dispatch, FC, ReactNode, createContext, useReducer } from 'react';

import { StateCartModel } from './state/Cart.state';
import { CartAction } from './action/Cart.action';

import CardReducer from '@reducers/CartReducer.reducer';

const initialState: StateCartModel = {
    saleDetails: [],
    subTotal: 0,
};

interface CartContextModel {
    state: StateCartModel;
    dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextModel>({
    dispatch: (value: CartAction) => {},
    state: initialState,
});

interface CardProviderProps {
    children: ReactNode;
}

const CartProvider: FC<CardProviderProps> = (props) => {
    const [state, dispatch] = useReducer(CardReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
