import { FC, LegacyRef, useEffect, useRef, useState } from 'react';

import { Divider } from 'antd';
import styled from 'styled-components';

import KPText from '../KPText';
import KPButton from '../KPButton';
import KPInput from '../KPInput';
import KPCustomInputNumber from '../KPCustomInputNumber';

export interface KPPurchaseFormProps {
    stock?: number;
    price?: number;
    onSetHeight?: (value?: number) => void;
}

const KPPurchaseForm: FC<KPPurchaseFormProps> = (props) => {
    const [quantity, setQuantity] = useState<number>(1);
    const refForm = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.onSetHeight && props.onSetHeight(refForm.current?.offsetHeight);
    }, [refForm]);

    const onSetQuantity = (action: 'add' | 'less') => {
        if (action === 'less') setQuantity(quantity - 1);
        else setQuantity(quantity + 1);
    };

    return (
        <Wrapper className="flex flex-column justify-center g-20 p-2" ref={refForm}>
            <KPText text="Cantidad" textColor="--primary-text-color" fontWeight={600} />
            <div>
                <KPCustomInputNumber
                    value={quantity}
                    onChange={setQuantity}
                    max={props.stock}
                    onLess={() => onSetQuantity('less')}
                    onPlus={() => onSetQuantity('add')}
                />
                <KPText
                    className="mt-1"
                    text={
                        <span className="flex flex-row">
                            Solo&nbsp;
                            <KPText
                                text={`${props.stock} productos`}
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
            <KPInput typeInput="textarea" placeholder="Escribe aquí..." />
            <Divider className="divider" />

            <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                <KPText text="Sub total" fontWeight={600} fontSize={11} />
                <KPText
                    text={`$${(props.price ?? 0) * quantity}`}
                    textColor="--primary-text-color"
                    fontWeight={600}
                    fontSize={18}
                />
            </div>

            <KPButton type="primary">Pagar ahora</KPButton>
            <KPButton theme="dark" type="primary">
                Agregar al carrito
            </KPButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: var(--secondary-color);
    border: 2px solid var(--quaternary-color);
    border-radius: 10px;

    .divider {
        margin: 0px;
    }
`;

export default KPPurchaseForm;
