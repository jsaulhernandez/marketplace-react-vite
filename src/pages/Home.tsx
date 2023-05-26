import { useEffect } from 'react';

import { Form, Radio, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DollarCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPPagination from '@components/KPPagination';
import KPText from '@components/KPText';
import KPProduct from '@components/products/KPProduct';
import KPItemFilter from '@components/KPItemFilter';
import KPCollapse from '@components/KPCollapse';
import KPInput from '@components/KPInput';

import { PRICES_FILTERS } from '@constants/Constants.constanst';

import useAxios from '@hooks/useAxios.hook';

import { CategoryModel } from '@interfaces/Category.model';
import { PayMethodModel } from '@interfaces/PayMethod.model';

interface FormFilters {
    category: string;
    startPrice: string;
    endPrice: string;
    method: string;
}

const Home = () => {
    const [stateCategories, fetchCategories] = useAxios<CategoryModel[]>();
    const [statePayMethods, fetchPayMethods] = useAxios<PayMethodModel[]>();
    const [form] = useForm<FormFilters>();

    useEffect(() => {
        getCategories();
        getPayMethods();
    }, []);

    const getCategories = () => {
        fetchCategories({
            method: 'GET',
            path: '/category/web/active',
        });
    };

    const getPayMethods = () => {
        fetchPayMethods({
            method: 'GET',
            path: '/pay-method/web/active',
        });
    };

    return (
        <Wrapper className="flex flex-row wp-100">
            <div className="Home_item flex flex-column">
                <div className="Home_item-filters wp-100 p-2 flex flex-column g-15">
                    <KPText
                        text="Filtros"
                        fontWeight={700}
                        fontSize={16}
                        textColor="--primary-text-color"
                    />

                    <Form
                        form={form}
                        autoComplete="off"
                        className="flex flex-column g-15"
                    >
                        <KPCollapse identifier="categories" name="Categorías">
                            <Form.Item name="category">
                                <Radio.Group className="flex flex-column g-10">
                                    {stateCategories.data?.map((c) => (
                                        <KPItemFilter label={c.name} value={c.id} />
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                        </KPCollapse>

                        <KPCollapse identifier="prices" name="Precios">
                            <div className="Home_item-filters-prices flex flex-row flex-wrap g-10">
                                <Form.Item name="startPrice">
                                    <KPInput
                                        placeholder="Minímo"
                                        addonBefore={<DollarCircleOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item name="endPrice">
                                    <KPInput
                                        placeholder="Máximo"
                                        addonBefore={<DollarCircleOutlined />}
                                    />
                                </Form.Item>
                                {PRICES_FILTERS.map((p, i) => (
                                    <KPItemFilter
                                        className="item"
                                        label={p}
                                        value={p}
                                        key={i}
                                        type="amount"
                                    />
                                ))}
                            </div>
                        </KPCollapse>

                        <KPCollapse identifier="pays" name="Pagos">
                            <Form.Item name="method">
                                <Radio.Group className="flex flex-column g-10">
                                    {statePayMethods.data?.map((c) => (
                                        <KPItemFilter label={c.name} value={c.id} />
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                        </KPCollapse>
                    </Form>
                </div>
            </div>

            <div className="Home_item flex flex-column p-1">
                <div className="Home_item-pagination flex flex-row justify-between items-center flex-wrap">
                    <div className="Home_item-pagination-data flex flex-row flex-wrap g-5">
                        <KPPagination />

                        <div className="flex flex-row">
                            <KPText text="para" textColor="--primary-text-color" />
                            &nbsp;
                            <KPText
                                text="search"
                                className="Home_item-pagination-data-search-for"
                                fontWeight={700}
                            />
                        </div>
                    </div>

                    <div className="Home_item-pagination-sort">
                        <div className="kp-item-row">
                            <label>Ordenar por:</label>
                            <Select className="select" defaultValue="desc">
                                <Select.Option key="desc">Más reciente</Select.Option>
                                <Select.Option key="asc">Más antiguo</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="Home_item-filters-container flex flex-row flex-wrap mt-1 mb-1 g-10">
                    <KPItemFilter type="tag" label="Macbook" />
                </div>

                <div className="Home_item-container flex flex-row flex-wrap wp-100">
                    <KPProduct className="Home_item-container-item" />
                    <KPProduct className="Home_item-container-item" />
                    <KPProduct className="Home_item-container-item" />
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    gap: 2%;

    .Home_item {
        width: 80%;

        &:first-child {
            width: 20%;
        }
    }

    .Home_item-filters {
        background-color: var(--secondary-color);
        border: 2px solid var(--quaternary-color);
        border-radius: 10px;
    }

    .ant-form-item {
        margin-bottom: 10px;
    }

    .Home_item-filters-prices .item {
        width: calc(100% / 2 - 5px);
    }

    .Home_item-pagination-data .Home_item-pagination-data-search-for {
        color: var(--primary-color);
    }

    .select {
        min-width: 140px;
    }

    .Home_item-container-item {
        width: calc(100% / 4 - 20px);
        margin: 10px;
    }
`;

export default Home;
