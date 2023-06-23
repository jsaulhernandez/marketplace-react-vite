import { FC, useEffect, useRef, useState } from 'react';

import { Divider, message } from 'antd';
import styled from 'styled-components';

import KPText from '../KPText';
import KPButton from '../KPButton';
import KPInput from '../KPInput';
import KPCustomInputNumber from '../KPCustomInputNumber';
import { ProductModel } from '@interfaces/Product.model';

import { formatMoney } from '@utils/Numbers.utils';
import { useCart } from '@hooks/useCart.hook';

export interface KPPurchaseFormProps {
    product?: ProductModel;
    color?: number;
    processor?: number;
    memorySize?: number;
    onSetHeight?: (value?: number) => void;
}

const KPPurchaseForm: FC<KPPurchaseFormProps> = (props) => {
    const {
        methods: { onAddProduct },
    } = useCart();

    const [quantity, setQuantity] = useState<number>(1);
    const [note, setNote] = useState<string>('');

    const refForm = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.onSetHeight && props.onSetHeight(refForm.current?.offsetHeight);
    }, [refForm]);

    const onSetQuantity = (action: 'add' | 'less') => {
        if (action === 'less') setQuantity(quantity - 1);
        else setQuantity(quantity + 1);
    };

    const onAddProductToCart = () => {
        if (!props.color) {
            message.warning('Debes seleccionar un color');
            return;
        }

        if (!props.processor) {
            message.warning('Debes seleccionar un procesador');
            return;
        }

        if (!props.memorySize) {
            message.warning('Debes seleccionar un tamaño de memoria');
            return;
        }

        onAddProduct({
            product: props.product,
            color: props.product?.color.find((c) => c.id === props.color),
            processor: props.product?.processor.find((p) => p.id === props.processor),
            memorySize: props.product?.memorySize.find((m) => m.id === props.memorySize),
            price: props.product?.price ?? 0,
            quantity,
            note,
        });
    };

    return (
        <Wrapper
            className="kp-card-wth-shadow flex-column justify-center g-20"
            ref={refForm}
        >
            <KPText text="Cantidad" textColor="--primary-text-color" fontWeight={600} />
            <div>
                <KPCustomInputNumber
                    value={quantity}
                    onChange={setQuantity}
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
                typeInput="textarea"
                placeholder="Escribe aquí..."
                onChange={setNote}
            />
            <Divider className="divider" />

            <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                <KPText text="Sub total" fontWeight={600} fontSize={11} />
                <KPText
                    text={`${formatMoney((props.product?.price ?? 0) * quantity)}`}
                    textColor="--primary-text-color"
                    fontWeight={600}
                    fontSize={18}
                />
            </div>

            <KPButton type="primary">Pagar ahora</KPButton>
            <KPButton theme="dark" type="primary" onClick={onAddProductToCart}>
                Agregar al carrito
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
