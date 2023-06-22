import { Divider } from 'antd';
import styled from 'styled-components';

import KPText from '@components/KPText';
import KPCartItem from '@components/cart/KPCartItem';
import KPButton from '@components/KPButton';

import { useCart } from '@hooks/useCart.hook';

import { formatMoney } from '@utils/Numbers.utils';

const Cart = () => {
    const { saleDetails, subTotal } = useCart();

    return (
        <Wrapper className="flex flex-row wp-100 wrapper relative g-20">
            <div className="Cart flex flex-column">
                <KPText text="Your items & Shipment" fontSize={30} />
                <div className="Cart_item kp-card-wth-shadow flex-column mt-2">
                    {saleDetails.length > 0 ? (
                        saleDetails.map((d, i) => <KPCartItem key={i} detail={d} />)
                    ) : (
                        <KPText
                            text="No tienes productos agregados"
                            fontSize={16}
                            textAlign="center"
                        />
                    )}
                </div>
            </div>
            <div className="Cart">
                <div className="kp-card-wth-shadow flex-column justify-center g-20">
                    <KPText
                        text="Obtener Promo"
                        textColor="--primary-text-color"
                        fontWeight={600}
                    />
                    <Divider className="divider" />

                    <KPText
                        text="Método de pago"
                        textColor="--primary-text-color"
                        fontWeight={600}
                    />
                    <Divider className="divider" />

                    <KPText
                        text="Resumen del pedido"
                        textColor="--primary-text-color"
                        fontWeight={600}
                    />

                    <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                        <KPText text="Sub total" fontWeight={600} fontSize={11} />
                        <KPText
                            text={`${formatMoney(subTotal)}`}
                            textColor="--primary-text-color"
                            fontWeight={600}
                            fontSize={16}
                        />
                    </div>
                    <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                        <KPText text="Sub total" fontWeight={600} fontSize={11} />
                        <KPText
                            text={`${formatMoney(20)}`}
                            textColor="--primary-text-color"
                            fontWeight={600}
                            fontSize={16}
                        />
                    </div>
                    <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                        <KPText text="Sub total" fontWeight={600} fontSize={11} />
                        <KPText
                            text={`${formatMoney(20)}`}
                            textColor="--primary-text-color"
                            fontWeight={600}
                            fontSize={16}
                        />
                    </div>
                    <Divider className="divider" />

                    <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                        <KPText text="Total" fontWeight={600} fontSize={20} />
                        <KPText
                            text={`${formatMoney(10)}`}
                            textColor="--primary-text-color"
                            fontWeight={600}
                            fontSize={20}
                        />
                    </div>

                    <KPButton type="primary">Pagar ahora</KPButton>
                </div>
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

    .divider {
        margin: 0px;
    }
`;

export default Cart;
