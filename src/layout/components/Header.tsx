import { useEffect } from 'react';

import { Button, Form, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPInput from '@components/KPInput';

import { useFilter } from '@hooks/useFilter.hook';

const Header = () => {
    const {
        methods: { getProducts },
        search,
        filters,
    } = useFilter();

    const [form] = useForm<{
        search: string;
    }>();

    useEffect(() => {
        getProducts();
    }, []);

    const onFilter = (e: { search: string }) => {
        getProducts(filters, e.search);
    };

    return (
        <Wrapper>
            <div className="Header_search-bar flex flex-row justify-between p-1 items-center">
                <div className="Header_items-logo">
                    <img src="/" alt="img" />
                </div>
                <div className="Header-items-search">
                    <Form
                        form={form}
                        autoComplete="off"
                        initialValues={{
                            search: search,
                        }}
                        onFinish={onFilter}
                    >
                        <Space.Compact>
                            <Form.Item name="search">
                                <KPInput
                                    prefix={<SearchOutlined />}
                                    placeholder="Buscar Macbook pro....."
                                />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Buscar
                            </Button>
                        </Space.Compact>
                    </Form>
                </div>
                <div className="Header-items-session">items</div>
            </div>
            <div className="Header_informative p-1"></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 120px;

    .Header_search-bar,
    .Header_informative {
        border-bottom: 2px solid var(--quaternary-color);
    }

    .Header_search-bar {
        height: 70px;
    }

    .Header_informative {
        height: 50px;
    }

    .ant-form-item {
        margin: 0px;
    }
`;

export default Header;
