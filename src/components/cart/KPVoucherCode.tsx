import { FC, useState } from 'react';

import styled from 'styled-components';

import KPButton from '@components/KPButton';
import KPInput from '@components/KPInput';

export interface KPVoucherCodeProps {
    onSendCode?: (value: string) => void;
}

const KPVoucherCode: FC<KPVoucherCodeProps> = (props) => {
    const [value, setValue] = useState<string>('');

    return (
        <Wrapper className="flex items-center relative">
            <KPInput
                className="input"
                placeholder="Código de cupón"
                onChange={setValue}
            />
            <KPButton
                type="secondary"
                className="button"
                onClick={() => props.onSendCode && props.onSendCode(value)}
            >
                Apply
            </KPButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-radius: 10px;
    height: 38px;

    .input {
        border-radius: 10px;
        padding: 13px 85px 13px 13px;
        border: none;
        background-color: unset;
        height: 38px;
        box-shadow: 0 0 0 1px var(--quaternary-color) !important;
        color: var(--primary-text-color) !important;
    }

    .button {
        height: 38px;
        position: absolute;
        z-index: 99;
        right: 0px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
`;

export default KPVoucherCode;
