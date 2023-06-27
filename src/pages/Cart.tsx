import styled from 'styled-components';

import KPText from '@components/KPText';
import KPCartItem from '@components/cart/KPCartItem';
import KPPayForm from '@components/cart/KPPayForm';
import Toast from '@components/KPToast';

import { useCart } from '@hooks/useCart.hook';
import useAxios from '@hooks/useAxios.hook';

import { SaleModel } from '@interfaces/Sale.model';

const Cart = () => {
    const {
        saleDetails,
        methods: { onRemoveProduct, onUpdateProductQuantity, onClean },
    } = useCart();

    const [stateSale, setFetch] = useAxios<SaleModel>();

    const onMakeSale = async (data: SaleModel) => {
        const response = await setFetch({
            method: 'POST',
            path: '/sale',
            data,
        });

        if (response.isSuccess) {
            onClean();
            Toast(
                'success',
                'Registro exitoso',
                'Tú compra ha sido registrada. Puedes verificar tu compra en MIS COMPRAS',
            );
        } else {
            Toast(
                'error',
                'Ocurrió un error',
                'La compra no ha sido registrada, por favor vuelva a intentarlo.',
            );
        }
    };

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
                <KPPayForm
                    className="Cart_pay-form"
                    onSendData={(value) => onMakeSale(value)}
                    loading={stateSale.isLoading}
                />
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
