import { FC, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { Divider } from 'antd';
import styled from 'styled-components';

import KPText from '../KPText';
import KPButton from '../KPButton';
import KPInput from '../KPInput';
import KPCustomInputNumber from '../KPCustomInputNumber';

import { useCart } from '@hooks/useCart.hook';

import { ProductModel } from '@interfaces/Product.model';

import { existsProductInCart } from '@helpers/Cart.helper';

import { formatMoney } from '@utils/Numbers.utils';

export interface KPPurchaseFormProps {
    product?: ProductModel;
    quantity: number;
    setQuantity: (value: number) => void;
    note: string;
    setNote: (value: string) => void;
    memorySize?: number;
    onSetHeight?: (value?: number) => void;
    onAddProductToCart: () => void;
}

const KPPurchaseForm: FC<KPPurchaseFormProps> = (props) => {
    const { saleDetails } = useCart();
    const navigate = useNavigate();

    const refForm = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.onSetHeight && props.onSetHeight(refForm.current?.offsetHeight);
    }, [refForm]);

    const onSetQuantity = (action: 'add' | 'less') => {
        if (action === 'less') props.setQuantity(props.quantity - 1);
        else props.setQuantity(props.quantity + 1);
    };

    const onGoToCart = () => {
        navigate('/kplace/cart');
    };

    return (
        <Wrapper
            className="kp-card-wth-shadow flex-column justify-center g-20"
            ref={refForm}
        >
            <KPText text="Cantidad" textColor="--primary-text-color" fontWeight={600} />
            <div>
                <KPCustomInputNumber
                    value={props.quantity}
                    onChange={props.setQuantity}
                    max={props.product?.stock}
                    onLess={() => onSetQuantity('less')}
                    onPlus={() => onSetQuantity('add')}
                />
                <KPText
                    className="mt-1"
                    text={
                        <span className="flex flex-row">
                            Solo&nbsp;
                            <KPText
                                text={`${props.product?.stock} productos`}
                                fontSize={11}
                                fontWeight={700}
                                textColor="--primary-color"
                            />
                            &nbsp;disponibles!
                        </span>
                    }
                    fontSize={11}
                    type="div"
                />
            </div>
            <Divider className="divider" />

            <KPText
                text="Agregar Notas"
                textColor="--primary-text-color"
                fontWeight={600}
            />
            <KPInput
                value={props.note}
                typeInput="textarea"
                placeholder="Escribe aquí..."
                onChange={props.setNote}
            />
            <Divider className="divider" />

            <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                <KPText text="Sub total" fontWeight={600} fontSize={11} />
                <KPText
                    text={`${formatMoney((props.product?.price ?? 0) * props.quantity)}`}
                    textColor="--primary-text-color"
                    fontWeight={600}
                    fontSize={18}
                />
            </div>

            <KPButton type="primary">Pagar ahora</KPButton>
            <KPButton
                theme={
                    !existsProductInCart(props.product, saleDetails) ? 'dark' : 'light'
                }
                type={
                    !existsProductInCart(props.product, saleDetails) ? 'primary' : 'link'
                }
                onClick={() =>
                    !existsProductInCart(props.product, saleDetails)
                        ? props.onAddProductToCart()
                        : onGoToCart()
                }
            >
                {!existsProductInCart(props.product, saleDetails)
                    ? 'Agregar al carrito'
                    : 'Ir a mi carrito'}
            </KPButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .divider {
        margin: 0px;
    }
`;

export default KPPurchaseForm;
