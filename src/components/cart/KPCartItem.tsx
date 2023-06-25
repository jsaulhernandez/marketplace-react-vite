import { FC } from 'react';

import { Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPLoadImage from '@components/KPLoadImage';
import KPText from '@components/KPText';
import KPCustomInputNumber from '@components/KPCustomInputNumber';

import { SaleDetailModel } from '@interfaces/SaleDetail.model';

import { formatMoney } from '@utils/Numbers.utils';

export interface KPCartItemProps {
    detail: SaleDetailModel;
    onRemoveProduct: () => void;
    onUpdateQuantity: (value: number) => void;
    className?: string;
}

const KPCartItem: FC<KPCartItemProps> = (props) => {
    const onSetQuantity = (action: 'add' | 'less') => {
        if (action === 'less') props.onUpdateQuantity(props.detail.quantity - 1);
        else props.onUpdateQuantity(props.detail.quantity + 1);
    };

    return (
        <Wrapper
            className={`KPCartItem flex relative pb-2 g-10 ${
                props.className ? props.className : ''
            }`}
        >
            <Tooltip title="Eliminar">
                <CloseOutlined
                    className="KPCartItem_close hand absolute"
                    onClick={props.onRemoveProduct}
                />
            </Tooltip>

            <div className="KPCartItem_content relative flex wp-100 g-10">
                <KPLoadImage
                    className="KPCartItem_content-image"
                    borderRadius={10}
                    image={'/images/m1.jpg'}
                />

                <div className="KPCartItem_content-information flex flex-column g-10">
                    <KPText
                        text={props.detail.product?.name}
                        fontSize={20}
                        fontWeight={600}
                        type="h1"
                    />
                    <KPText text={`${props.detail.quantity} Items`} />

                    <KPText
                        text={`${props.detail.color?.value} | ${props.detail.processor?.name} | ${props.detail.memorySize?.value}`}
                    />

                    <KPText
                        text={`Note: ${
                            props.detail.note !== '' ? props.detail.note : 'no hay notas'
                        }`}
                    />

                    <KPText
                        text={`${
                            formatMoney(props.detail.quantity * props.detail.price) ?? '0'
                        }`}
                        fontSize={25}
                        fontWeight={700}
                        textColor="--primary-text-color"
                    />
                </div>
            </div>

            <div className="flex flex-column justify-center items-center pt-2">
                <KPCustomInputNumber
                    blockKeyboard
                    value={props.detail.quantity}
                    onLess={() => onSetQuantity('less')}
                    onPlus={() => onSetQuantity('add')}
                    max={props.detail.product?.stock}
                />
                <KPText
                    className="mt-1"
                    text={
                        <span className="flex flex-row">
                            Solo&nbsp;
                            <KPText
                                text={`${props.detail.product?.stock ?? 0} productos`}
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
        </Wrapper>
    );
};

const Wrapper = styled.div`
    &:not(:first-child) {
        border-top: 1px solid var(--quaternary-color);
    }

    .KPCartItem_close {
        top: 5px;
        transform: scale(1.1);
        color: var(--quaternary-text-color);
        right: 5px;
        z-index: 99;

        &:hover {
            color: var(--primary-color);
        }
    }

    .KPCartItem_content-image {
        width: calc(100% / 4);
        height: 150px;
        padding: 15px;
    }

    .KPCartItem_content-information {
        width: 85%;
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }

    @media screen and (max-width: 600px) {
        .KPCartItem_content {
            flex-direction: column;
        }

        .KPCartItem_content-image {
            width: 100%;
        }
    }
`;

export default KPCartItem;
