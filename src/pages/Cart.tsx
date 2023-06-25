import styled from 'styled-components';

import KPText from '@components/KPText';
import KPCartItem from '@components/cart/KPCartItem';
import KPPayForm from '@components/cart/KPPayForm';

import { useCart } from '@hooks/useCart.hook';

const Cart = () => {
    const {
        saleDetails,
        methods: { onRemoveProduct, onUpdateProductQuantity },
    } = useCart();

    return (
        <Wrapper className="flex flex-row wp-100 wrapper relative g-20">
            <div className="Cart flex flex-column">
                <KPText text="Your items & Shipment" fontSize={30} />
                <div className="Cart_item kp-card-wth-shadow flex-column mt-2">
                    {saleDetails.length > 0 ? (
                        saleDetails.map((d, i) => (
                            <KPCartItem
                                key={i}
                                detail={d}
                                onRemoveProduct={() => onRemoveProduct(d)}
                                onUpdateQuantity={(value) =>
                                    onUpdateProductQuantity({ ...d, quantity: value })
                                }
                                className="p-2"
                            />
                        ))
                    ) : (
                        <KPText
                            text="No tienes productos agregados"
                            fontSize={16}
                            textAlign="center"
                            marginTop={20}
                            marginBottom={20}
                        />
                    )}
                </div>
            </div>
            <div className="Cart">
                <KPPayForm className="Cart_pay-form" />
            </div>
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

    .Cart .Cart_item {
        padding: 0px;
    }

    .divider {
        margin: 0px;
    }

    @media screen and (max-width: 1100px) {
        .Cart {
            width: 30%;

            &:first-child {
                width: 70%;
            }
        }
    }

    @media screen and (max-width: 900px) {
        flex-direction: column;

        .Cart {
            width: 100% !important;
        }

        .Cart:last-child {
            display: flex;
            justify-content: center;

            .Cart_pay-form {
                width: 50%;
            }
        }
    }

    @media screen and (max-width: 600px) {
        .Cart:last-child .Cart_pay-form {
            width: 100%;
        }
    }
`;

export default Cart;
