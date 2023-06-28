import { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react';

import { DatePicker, Input, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DatePickerProps } from 'antd/es/date-picker';
import styled from 'styled-components';

export type TypeInput = 'input' | 'textarea' | 'date' | 'time';

export interface KPInputProps {
    typeInput?: TypeInput;
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    height?: number;
    placeholder?: string;
    className?: string;
    onChange?: (value: string | any) => void;
    defaultValue?: string | number | ReadonlyArray<string>;
    value?: string | number | ReadonlyArray<string>;
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    disabledDate?: DatePickerProps['disabledDate'];
    format?: string | string[];
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
        defaultValue,
        value,
        disabledDate,
        format,
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
                defaultValue={defaultValue}
                value={value}
                {...rest}
            />
        );

    if (typeInput === 'date')
        return (
            <DatePickerWrapper
                disabledDate={props.disabledDate}
                onChange={(e) => props.onChange && props.onChange(e)}
                format={format}
                {...rest}
            />
        );

    if (typeInput === 'time')
        return (
            <TimePickerWrapper
                disabledDate={props.disabledDate}
                onChange={(e) => props.onChange && props.onChange(e)}
                format={format}
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
            defaultValue={defaultValue}
            value={value}
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

const DatePickerWrapper = styled(DatePicker)<{
    height?: number;
}>`
    height: ${({ height }) => getHeight(height)};
    width: 100%;
`;

const TimePickerWrapper = styled(TimePicker)<{
    height?: number;
}>`
    height: ${({ height }) => getHeight(height)};
    width: 100%;
`;

export default KPInput;
