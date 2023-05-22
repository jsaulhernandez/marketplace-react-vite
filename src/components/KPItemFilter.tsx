import { FC } from 'react';

import { Checkbox } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPText from './KPText';

type typeFilter = 'category' | 'amount' | 'tag';

export interface KPItemFilterProps {
    type?: typeFilter;
    onClick?: (value?: string | boolean) => void;
    label?: string;
    value?: string;
    active?: boolean;
    className?: string;
}

const KPItemFilter: FC<KPItemFilterProps> = (props) => {
    if (props.type === 'tag')
        return (
            <TagWrapper
                className={`flex items-center g-10 p-1 ${
                    props.className ? props.className : ''
                }`}
            >
                <KPText text="Hola como estas xdxd" />
                <CloseCircleOutlined
                    className="hand closable"
                    onClick={() => props.onClick && props.onClick()}
                />
            </TagWrapper>
        );

    if (props.type === 'amount')
        return (
            <Amount
                className={`flex items-center justify-center p-1 hand ${
                    props.className ? props.className : ''
                }`}
                onClick={() => props.onClick && props.onClick(props.value)}
                active={props.active}
            >
                <KPText text={props.label ?? ''} fontWeight={500} fontSize={12} />
            </Amount>
        );

    return (
        <Category
            className={`flex items-center g-10 ${props.className ? props.className : ''}`}
        >
            <Checkbox
                onChange={(e) => props.onClick && props.onClick(e.target.checked)}
            />
            <KPText text="AirPods" />
        </Category>
    );
};

const Category = styled.div``;

const TagWrapper = styled.div`
    border-radius: 5px;
    /* border: 1px solid var(--quaternary-color); */
    background-color: var(--secondary-color);
    box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45),
        5px 5px 9px rgba(94, 104, 121, 0.3);

    .closable {
        color: var(--secondary-text-color);
    }
`;

const Amount = styled.div<{
    active?: boolean;
}>`
    border-radius: 5px;
    border: 1px solid
        ${({ active }) => (active ? 'var(--primary-color)' : 'var(--quaternary-color)')};
    background-color: ${({ active }) => (active ? '#CEE1F9' : 'var(--secondary-color)')};

    p {
        color: ${({ active }) =>
            active ? 'var(--primary-color)' : 'var(--secondary-text-color)'};
    }
`;

export default KPItemFilter;
