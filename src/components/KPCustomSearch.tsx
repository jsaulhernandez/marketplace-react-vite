import { FC, useEffect } from 'react';

import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPInput from './KPInput';
import KPButton from './KPButton';

import { useFilter } from '@hooks/useFilter.hook';

export interface KPCustomSearchProps {
    onSearch: (search: string) => void;
    className?: string;
}

const KPCustomSearch: FC<KPCustomSearchProps> = (props) => {
    const { search } = useFilter();

    const [form] = useForm<{
        search: string;
    }>();

    useEffect(() => {
        form.setFieldValue('search', search);
    }, [search]);

    return (
        <Wrapper className={`${props.className ? props.className : ''}`}>
            <Form
                form={form}
                autoComplete="off"
                onFinish={(e) => props.onSearch(e.search)}
            >
                <div className="KPCustomSearch_content flex items-center relative">
                    <Form.Item name="search" className="wp-100">
                        <KPInput
                            className="input-item relative"
                            prefix={<SearchOutlined className="icon-item" />}
                        />
                    </Form.Item>
                    <KPButton htmlType="submit" type="primary" className="button-item">
                        Buscar
                    </KPButton>
                </div>
            </Form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .KPCustomSearch_content {
        border-radius: 15px;
        border: 2px solid var(--quaternary-color);
        height: 50px;
    }

    .ant-form-item {
        margin: 0px;
    }

    .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        position: relative;
    }

    .KPCustomSearch_content .input-item {
        border-radius: 15px;
        padding: 13px 100px 13px 50px;
        border: none;
        background-color: unset;

        &:focus-within {
            box-shadow: 0 0 0 1px var(--primary-color) !important;
        }

        input:focus {
            color: var(--primary-color);
            font-weight: 700;
        }
    }

    .KPCustomSearch_content .input-item:focus-within > .ant-input-prefix .icon-item {
        color: var(--primary-color) !important;
    }

    .KPCustomSearch_content .icon-item,
    .KPCustomSearch_content .button-item {
        position: absolute;
        z-index: 9999;
    }

    .KPCustomSearch_content .icon-item {
        left: 20px;
        transform: scale(1.5);
        color: var(--secondary-text-color);
    }

    .KPCustomSearch_content .button-item {
        right: 10px;
    }
`;

export default KPCustomSearch;
