import { FC, useEffect, useState } from 'react';

import { Divider, Radio, Spin, message } from 'antd';
import styled from 'styled-components';

import KPText from '@components/KPText';
import KPButton from '@components/KPButton';
import KPVoucherCode from './KPVoucherCode';
import KPItemFilter from '@components/KPItemFilter';

import { useCart } from '@hooks/useCart.hook';
import useAxios from '@hooks/useAxios.hook';

import { PaymentMethodModel } from '@interfaces/PaymentMethod.model';
import { SaleModel } from '@interfaces/Sale.model';

import { formatMoney } from '@utils/Numbers.utils';

import { shippingCost, tax } from '@constants/Constants.constants';

export interface KPPayFormProps {
    onPay?: () => void;
    className?: string;
    onSendData: (info: SaleModel) => void;
    loading?: boolean;
}

const KPPayForm: FC<KPPayFormProps> = (props) => {
    const [statePaymentMethods, fetchPaymentMethods] = useAxios<PaymentMethodModel[]>();
    const { saleDetails, subTotal } = useCart();

    const [stateTax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [method, setMethod] = useState<PaymentMethodModel>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setTax(subTotal * (tax / 100));
    }, [subTotal]);

    useEffect(() => {
        if (subTotal > 0) setTotal(subTotal + shippingCost + stateTax);
        else setTotal(0);
    }, [stateTax]);

    useEffect(() => {
        if (saleDetails.length > 1 || saleDetails.length === 0) getPaymentMethods();
    }, [saleDetails]);

    const getPaymentMethods = () => {
        fetchPaymentMethods({
            method: 'GET',
            path: '/payment-method/web/active',
        });
    };

    const onGetValueRadioGroup = (
        value: number,
        paymentMethods: PaymentMethodModel[],
    ) => {
        setMethod(paymentMethods.find((pm) => pm.id === value));
        setError(false);
    };

    const onBuildSale = () => {
        if (saleDetails.length === 0) {
            message.warning('Debes agregar al menos un producto');
            return;
        }

        if (!method) {
            setError(true);
            return;
        }

        props.onSendData({
            shippingCost: shippingCost,
            tax,
            paymentMethod: method,
            user: 'Saul',
            detail: saleDetails,
        });

        setMethod(undefined);
    };

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
            <KPVoucherCode />
            <Divider className="divider" />

            <KPText
                text="Método de pago"
                textColor="--primary-text-color"
                fontWeight={600}
            />
            {saleDetails.length > 1 || saleDetails.length === 0 ? (
                <Spin
                    style={{
                        minHeight: `70px`,
                    }}
                    tip="Cargando..."
                    spinning={statePaymentMethods.isLoading}
                >
                    {statePaymentMethods.data && statePaymentMethods.data.length > 0 && (
                        <Radio.Group
                            className="flex flex-column g-10"
                            onChange={(e) =>
                                onGetValueRadioGroup(
                                    e.target.value,
                                    statePaymentMethods.data ?? [],
                                )
                            }
                            defaultValue={method}
                        >
                            {statePaymentMethods.data?.map((c) => (
                                <KPItemFilter label={c.name} value={c.id} key={c.id} />
                            ))}
                        </Radio.Group>
                    )}
                </Spin>
            ) : saleDetails.length === 1 ? (
                <Radio.Group
                    className="flex flex-column g-10"
                    onChange={(e) =>
                        onGetValueRadioGroup(
                            e.target.value,
                            saleDetails[0].product?.paymentMethod ?? [],
                        )
                    }
                    defaultValue={method}
                >
                    {saleDetails[0].product?.paymentMethod?.map((c) => (
                        <KPItemFilter label={c.name} value={c.id} key={c.id} />
                    ))}
                </Radio.Group>
            ) : null}
            {error && (
                <div className="custom-message-error">
                    Por favor selecciona una forma de pago
                </div>
            )}
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
                <KPText text={`Impuesto (${tax}%)`} fontWeight={600} fontSize={11} />
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

            <KPButton type="primary" onClick={onBuildSale} loading={props.loading}>
                Pagar ahora
            </KPButton>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default KPPayForm;
