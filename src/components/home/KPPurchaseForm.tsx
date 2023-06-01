import { FC, useState } from 'react';

import styled from 'styled-components';

import KPText from '../KPText';
import KPButton from '../KPButton';
import KPInput from '../KPInput';
import KPCustomInputNumber from '../KPCustomInputNumber';

export interface KPPurchaseFormProps {
    stock?: number;
}

const KPPurchaseForm: FC<KPPurchaseFormProps> = (props) => {
    const [quantity, setQuantity] = useState<number>(1);

    const onSetQuantity = (action: 'add' | 'less') => {
        if (action === 'less') setQuantity(quantity - 1);
        else setQuantity(quantity + 1);
    };

    return (
        <Wrapper className="flex flex-column justify-center g-20 p-2">
            <KPText text="Cantidad" textColor="--primary-text-color" fontWeight={600} />
            <KPCustomInputNumber
                value={quantity}
                onChange={setQuantity}
                max={props.stock}
                onLess={() => onSetQuantity('less')}
                onPlus={() => onSetQuantity('add')}
            />

            <KPText
                text="Agregar Notas"
                textColor="--primary-text-color"
                fontWeight={600}
            />

            <KPInput typeInput="textarea" placeholder="Escribe aquí..." />

            <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                <KPText text="Sub total" fontWeight={600} fontSize={10} />
                <KPText
                    text="$2690.15"
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
`;

export default KPPurchaseForm;
