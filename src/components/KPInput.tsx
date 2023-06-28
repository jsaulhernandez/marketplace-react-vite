import { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react';

import { Input } from 'antd';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';

export type TypeInput = 'input' | 'textarea';

export interface KPInputProps {
    typeInput?: TypeInput;
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    height?: number;
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
    defaultValue?: string | number | ReadonlyArray<string>;
    value?: string | number | ReadonlyArray<string>;
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const KPInput: FC<KPInputProps> = (props) => {
    const {
        typeInput,
        addonAfter,
        addonBefore,
        prefix,
        suffix,
        onChange,
        className,
        ...rest
    } = props;

    if (typeInput === 'textarea')
        return (
            <TextArea
                onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    onChange && onChange(e.target.value)
                }
                className={`${className ? className : ''}`}
                allowClear={false}
                {...rest}
            />
        );

    return (
        <InputWrapper
            onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
            onChange={(e) => onChange && onChange(e.target.value)}
            className={`${className ? className : ''}`}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            prefix={prefix}
            suffix={suffix}
            {...rest}
        />
    );
};

const getHeight = (height?: number) => {
    if (height) return `${height}px`;
    return '40px !important';
};

const InputWrapper = styled(Input)<{
    height?: number;
}>`
    height: ${({ height }) => getHeight(height)};
`;

export default KPInput;
