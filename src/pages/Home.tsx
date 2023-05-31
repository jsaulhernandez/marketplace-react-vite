import { useEffect, useState } from 'react';

import { Form, Radio, Select, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DollarCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPPagination from '@components/KPPagination';
import KPText from '@components/KPText';
import KPProduct from '@components/products/KPProduct';
import KPItemFilter from '@components/KPItemFilter';
import KPCollapse from '@components/KPCollapse';
import KPInput from '@components/KPInput';
import KPButton from '@components/KPButton';

import { ORDER_BY, PRICES_FILTERS } from '@constants/Constants.constants';

import useAxios from '@hooks/useAxios.hook';
import { useFilter } from '@hooks/useFilter.hook';

import { FiltersModel } from '@context/action/Filter.action';

import { CategoryModel } from '@interfaces/Category.model';
import { PayMethodModel } from '@interfaces/PayMethod.model';

import { convertStringToMoney } from '@utils/Strings.utils';
import { validateNumbersWithDecimals } from '@utils/Validator.utils';

interface FormFilters {
    category: string;
    startPrice: string;
    endPrice: string;
    method: string;
}

const Home = () => {
    const {
        filters,
        search,
        products,
        page,
        isLoading,
        methods: { getProducts },
    } = useFilter();
    const [stateCategories, fetchCategories] = useAxios<CategoryModel[]>();
    const [statePayMethods, fetchPayMethods] = useAxios<PayMethodModel[]>();

    const [form] = useForm<FormFilters>();
    const [priceSelected, setPrice] = useState<string>();

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

    const onFinish = (values: FormFilters) => {
        getProducts(
            {
                category: values.category,
                method: values.method,
                priceRange: !priceSelected
                    ? values.startPrice && values.endPrice
                        ? `${values.startPrice},${values.endPrice}`
                        : undefined
                    : priceSelected,
            },
            search,
        );
    };

    const onChangeValues = (e: FormFilters) => {
        if (e.startPrice) {
            if (e.startPrice.trim() !== '') {
                setPrice('');
                return;
            }
        }

        if (e.endPrice) {
            if (e.endPrice.trim() !== '') {
                setPrice('');
                return;
            }
        }
    };

    const onSelectedPrice = (value: string) => {
        form.setFieldValue('startPrice', '');
        form.setFieldValue('endPrice', '');
        setPrice(value);
    };

    const onChange = (page: number) => {
        console.log('pagina => ', page);
    };

    const onChangeOrder = (order: ORDER_BY) => {
        getProducts(filters, search, order);
    };

    const resetFilter = () => {
        form.setFieldValue('category', '');
        form.setFieldValue('method', '');
        form.setFieldValue('startPrice', '');
        form.setFieldValue('endPrice', '');
        setPrice(undefined);
        getProducts();
    };

    const getHistory = (): { label: string; value: string }[] => {
        let array: { label: string; value: string }[] = [];

        const getCategory =
            stateCategories.data?.find((c) => c.id === Number(filters?.category))?.name ??
            '';
        array.push({
            label: 'category',
            value: getCategory,
        });

        const getPayMethod =
            statePayMethods.data?.find((p) => p.id === Number(filters?.method))?.name ??
            '';
        array.push({
            label: 'method',
            value: getPayMethod,
        });

        let getPrices = PRICES_FILTERS.find(
            (pf) => pf.value === filters?.priceRange,
        )?.label;

        if (!getPrices) getPrices = convertStringToMoney(filters?.priceRange);
        array.push({
            label: 'priceRange',
            value: getPrices,
        });

        return array.filter((x) => x.value !== '');
    };

    const onRemoveFilter = (label: keyof FiltersModel) => {
        if (label === 'priceRange') {
            form.setFieldValue('startPrice', '');
            form.setFieldValue('endPrice', '');
            setPrice(undefined);
        } else {
            form.setFieldValue(label, '');
        }

        getProducts(
            {
                ...filters,
                [label]: undefined,
            },
            search,
        );
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
                        onFinish={onFinish}
                        onValuesChange={onChangeValues}
                        initialValues={{
                            category: '',
                            method: '',
                            startPrice: '',
                            endPrice: '',
                        }}
                    >
                        <KPCollapse identifier="categories" name="Categorías">
                            <Form.Item name="category">
                                <Radio.Group className="flex flex-column g-10">
                                    {stateCategories.data?.map((c) => (
                                        <KPItemFilter
                                            label={c.name}
                                            value={c.id}
                                            key={c.id}
                                        />
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                        </KPCollapse>

                        <KPCollapse identifier="prices" name="Precios">
                            <div className="Home_item-filters-prices flex flex-row flex-wrap g-10">
                                <Form.Item
                                    name="startPrice"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                validateNumbersWithDecimals(value),
                                        },
                                    ]}
                                >
                                    <KPInput
                                        placeholder="Minímo"
                                        addonBefore={<DollarCircleOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="endPrice"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                validateNumbersWithDecimals(value),
                                        },
                                    ]}
                                >
                                    <KPInput
                                        placeholder="Máximo"
                                        addonBefore={<DollarCircleOutlined />}
                                    />
                                </Form.Item>
                                {PRICES_FILTERS.map((p, i) => (
                                    <KPItemFilter
                                        className="item"
                                        label={p.label}
                                        value={p.value}
                                        key={i}
                                        type="amount"
                                        active={priceSelected === p.value}
                                        onClick={(value) => onSelectedPrice(`${value}`)}
                                    />
                                ))}
                            </div>
                        </KPCollapse>

                        <KPCollapse identifier="pays" name="Pagos">
                            <Form.Item name="method">
                                <Radio.Group className="flex flex-column g-10">
                                    {statePayMethods.data?.map((c) => (
                                        <KPItemFilter
                                            label={c.name}
                                            value={c.id}
                                            key={c.id}
                                        />
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                        </KPCollapse>

                        <KPButton type="primary" htmlType="submit">
                            Filtrar
                        </KPButton>
                    </Form>
                </div>
            </div>

            <div className="Home_item flex flex-column p-1">
                <div className="Home_item-pagination flex flex-row justify-between items-center flex-wrap">
                    <div className="Home_item-pagination-data flex flex-row flex-wrap g-5">
                        {page && (
                            <KPPagination
                                current={page?.page}
                                pageSize={16}
                                total={page?.itemCount}
                                onChange={onChange}
                            />
                        )}

                        {search && (
                            <div className="flex flex-row">
                                <KPText text="para" textColor="--primary-text-color" />
                                &nbsp;
                                <KPText
                                    text={`"${search}"`}
                                    className="Home_item-pagination-data-search-for"
                                    fontWeight={700}
                                />
                            </div>
                        )}
                    </div>

                    <div className="Home_item-pagination-sort">
                        <div className="kp-item-row">
                            <label>Ordenar por:</label>
                            <Select
                                className="select"
                                defaultValue="DESC"
                                onChange={onChangeOrder}
                            >
                                <Select.Option key="DESC">Más reciente</Select.Option>
                                <Select.Option key="ASC">Más antiguo</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="Home_item-filters-container flex flex-row flex-wrap mt-1 mb-1 g-10">
                    {getHistory().length > 0 && (
                        <>
                            {getHistory().map((h, i) => (
                                <KPItemFilter
                                    type="tag"
                                    label={h.value}
                                    value={h.label}
                                    key={i}
                                    onClick={(value) =>
                                        onRemoveFilter(`${value}` as keyof FiltersModel)
                                    }
                                />
                            ))}
                            <KPButton type="link" onClick={resetFilter}>
                                Eliminar filtros
                            </KPButton>
                        </>
                    )}
                </div>

                <Spin
                    style={{
                        minHeight: `300px`,
                    }}
                    tip="Cargando productos..."
                    spinning={isLoading}
                >
                    <div className="Home_item-container flex flex-row flex-wrap wp-100">
                        {products?.map((value, i) => (
                            <KPProduct
                                className="Home_item-container-item"
                                key={i}
                                data={value}
                                index={i}
                            />
                        ))}
                    </div>
                </Spin>
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
