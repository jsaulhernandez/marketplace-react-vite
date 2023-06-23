import { FC } from 'react';

import styled from 'styled-components';

import KPLoadImage from '@components/KPLoadImage';
import KPText from '@components/KPText';

import { formatMoney } from '@utils/Numbers.utils';
import { SaleDetailModel } from '@interfaces/SaleDetail.model';

export interface KPCartItemProps {
    detail: SaleDetailModel;
}

const KPCartItem: FC<KPCartItemProps> = (props) => {
    return (
        <Wrapper className="flex flex-row pb-2 g-10">
            <KPLoadImage
                className="KPCartItem_image"
                borderRadius={10}
                image={'/images/m1.jpg'}
            />
            <div className="KPCartItem_information flex flex-column g-10">
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
        </Wrapper>
    );
};

const Wrapper = styled.div`
    &:last-child {
        padding-bottom: 0px;
    }

    .KPCartItem_image {
        width: 15%;
        height: 150px;
        padding: 15px;
    }

    .KPCartItem_information {
        width: 85%;
    }
`;

export default KPCartItem;
