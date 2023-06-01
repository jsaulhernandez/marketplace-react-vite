import { FC } from 'react';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPInput from './KPInput';
import KPButton from './KPButton';

export interface KPCustomInputNumberProps {
    value?: number;
    max?: number;
    onChange?: (value: any) => any;
    onLess?: () => void;
    onPlus?: () => void;
}

const KPCustomInputNumber: FC<KPCustomInputNumberProps> = ({ value = 0, ...props }) => {
    return (
        <Wrapper className="flex items-center relative">
            <KPButton
                disabled={value === 1}
                type="primary"
                prefix={<MinusOutlined />}
                className="button-left"
                onClick={() => props.onLess && props.onLess()}
            />
            <KPInput
                className="input"
                value={value}
                onChange={(e) => props.onChange && props.onChange(e)}
            />
            <KPButton
                disabled={value === props.max}
                type="primary"
                prefix={<PlusOutlined />}
                className="button-right"
                onClick={() => props.onPlus && props.onPlus()}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-radius: 10px;
    border: 2px solid var(--quaternary-color);

    .input {
        border-radius: 10px;
        padding: 13px 50px 13px 50px;
        border: none;
        background-color: unset;
        height: 38px;
        box-shadow: 0 0 0 1px var(--primary-color) !important;
        text-align: center;
        color: var(--primary-text-color) !important;
        font-weight: 600 !important;
    }

    .button-left,
    .button-right {
        position: absolute;
        z-index: 9999;
    }

    .button-left {
        left: 0px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .button-right {
        right: 0px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
`;

export default KPCustomInputNumber;
