import { FC, useEffect, useState } from 'react';

import { Divider } from 'antd';
import styled from 'styled-components';

import KPText from '@components/KPText';
import KPButton from '@components/KPButton';

import { useCart } from '@hooks/useCart.hook';

import { formatMoney } from '@utils/Numbers.utils';

import { shippingCost, tax } from '@constants/Constants.constants';

export interface KPPayFormProps {
    onPay?: () => void;
    className?: string;
}

const KPPayForm: FC<KPPayFormProps> = (props) => {
    const { saleDetails, subTotal } = useCart();
    const [stateTax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setTax(subTotal * (tax / 100));
    }, [subTotal]);

    useEffect(() => {
        setTotal(subTotal + shippingCost + stateTax);
    }, [stateTax]);

    return (
        <Wrapper
            className={`kp-card-wth-shadow flex-column justify-center g-20 ${
                props.className ? props.className : ''
            }`}
        >
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
                <KPText text="Costo de envío" fontWeight={600} fontSize={11} />
                <KPText
                    text={`${formatMoney(saleDetails.length > 0 ? shippingCost : 0)}`}
                    textColor="--primary-text-color"
                    fontWeight={600}
                    fontSize={16}
                />
            </div>
            <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                <KPText text={`Inpuesto (${tax}%)`} fontWeight={600} fontSize={11} />
                <KPText
                    text={`${formatMoney(saleDetails.length > 0 ? stateTax : 0)}`}
                    textColor="--primary-text-color"
                    fontWeight={600}
                    fontSize={16}
                />
            </div>
            <Divider className="divider" />

            <div className="flex flex-wrap justify-between items-center justify-center g-10 wp-100">
                <KPText text="Total" fontWeight={600} fontSize={20} />
                <KPText
                    text={`${formatMoney(total)}`}
                    textColor="--primary-text-color"
                    fontWeight={600}
                    fontSize={20}
                />
            </div>

            <KPButton type="primary">Pagar ahora</KPButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    width: 20%;
`;

export default KPPayForm;
