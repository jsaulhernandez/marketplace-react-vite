import { FC, ReactNode } from 'react';

import { Input } from 'antd';
import styled from 'styled-components';

export interface KPInputProps {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    height?: number;
    placeholder?: string;
    className?: string;
}

const KPInput: FC<KPInputProps> = (props) => {
    const { className, ...rest } = props;
    return <InputWrapper className={`${className ? className : ''}`} {...rest} />;
};

const getHeight = (height?: number) => {
    if (height) return `${height}px`;
    return 'auto';
};

const InputWrapper = styled(Input)<{
    height?: number;
}>`
    height: ${({ height }) => getHeight(height)};
`;

export default KPInput;
