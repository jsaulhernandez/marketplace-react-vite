import KPText from '@components/KPText';
import KPCartItem from '@components/cart/KPCartItem';
import { useCart } from '@hooks/useCart.hook';
import styled from 'styled-components';

const Cart = () => {
    const { saleDetails } = useCart();

    return (
        <Wrapper className="flex flex-row wp-100 wrapper relative g-20">
            <div className="Cart flex flex-column">
                <KPText text="Your items & Shipment" fontSize={30} />
                <div className="Cart_item kp-card-wth-shadow flex-column mt-2">
                    {saleDetails.length > 0 ? (
                        saleDetails.map((d, i) => <KPCartItem key={i} detail={d} />)
                    ) : (
                        <KPText
                            text="No has agregado productos al carrito"
                            fontSize={16}
                            textAlign="center"
                        />
                    )}
                </div>
            </div>
            <div className="Cart"></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .Cart {
        width: 20%;

        &:first-child {
            width: 80%;
        }
    }
`;

export default Cart;
