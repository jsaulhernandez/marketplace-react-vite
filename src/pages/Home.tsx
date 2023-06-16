import { UIEventHandler, useEffect, useState } from 'react';

import { Form, Radio, Select, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DollarCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { motion } from 'framer-motion';

import KPPagination from '@components/KPPagination';
import KPText from '@components/KPText';
import KPProduct from '@components/products/KPProduct';
import KPItemFilter from '@components/KPItemFilter';
import KPCollapse from '@components/KPCollapse';
import KPInput from '@components/KPInput';
import KPButton from '@components/KPButton';
import KPProductDetail from '@components/home/KPProductDetail';

import { ORDER_BY, PRICES_FILTERS, SHOWING } from '@constants/Constants.constants';

import { FiltersModel } from '@context/action/Filter.action';

import useAxios from '@hooks/useAxios.hook';
import { useFilter } from '@hooks/useFilter.hook';
import { useResize } from '@hooks/useResize.hook';

import { CategoryModel } from '@interfaces/Category.model';
import { PayMethodModel } from '@interfaces/PaymentMethod.model';
import { ProductModel } from '@interfaces/Product.model';

import { convertStringToMoney } from '@utils/Strings.utils';
import { validateNumbersWithDecimals } from '@utils/Validator.utils';
import { UIEvent } from 'react';

interface FormFilters {
    category?: string;
    startPrice?: string;
    endPrice?: string;
    method?: string;
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
    const [is768] = useResize(768);

    const [form] = useForm<FormFilters>();

    const [priceSelected, setPrice] = useState<string>();
    const [show, setShow] = useState<SHOWING>('DATA');
    const [data, setData] = useState<ProductModel>();
    const [filtersData, setFiltersData] = useState<FormFilters>();
    const [order, setOrder] = useState<ORDER_BY>('DESC');
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [isTop, setTop] = useState<boolean>(false);

    useEffect(() => {
        getCategories();
        getPayMethods();
    }, []);

    useEffect(() => {
        if (filtersData || priceSelected) {
            const priceRange = !priceSelected
                ? filtersData?.startPrice && filtersData?.endPrice
                    ? `${filtersData.startPrice},${filtersData?.endPrice}`
                    : undefined
                : priceSelected;

            if (!filtersData?.category && !filtersData?.method && !priceRange) return;
            if (
                (filtersData?.category || filtersData?.method) &&
                filtersData?.startPrice &&
                !filtersData?.endPrice
            )
                return;

            getProducts(
                {
                    category: filtersData?.category,
                    method: filtersData?.method,
                    priceRange,
                },
                search,
            );
        }
    }, [filtersData, priceSelected]);

    useEffect(() => {
        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
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

    const onChangeValues = (e: FormFilters) => {
        setFiltersData({
            category: e.category ?? filtersData?.category,
            startPrice: e.startPrice ?? filtersData?.startPrice,
            endPrice: e.endPrice ?? filtersData?.endPrice,
            method: e.method ?? filtersData?.method,
        });

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
        getProducts(filters, search, order, `${page}`);
    };

    const onChangeOrder = (dataOrder: ORDER_BY) => {
        setOrder(dataOrder);
        getProducts(filters, search, dataOrder);
    };

    const resetFilter = () => {
        form.setFieldValue('category', '');
        form.setFieldValue('method', '');
        form.setFieldValue('startPrice', '');
        form.setFieldValue('endPrice', '');
        setPrice(undefined);
        setFiltersData(undefined);
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

            setFiltersData({
                ...filtersData,
                startPrice: undefined,
                endPrice: undefined,
            });
        } else {
            form.setFieldValue(label, '');
            setFiltersData({ ...filtersData, [label]: undefined });
        }

        if (getHistory().length < 2) getProducts();
    };

    const onShowProductDetail = (info?: ProductModel) => {
        setData(info);
        setShow('DETAIL');
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY; // => scroll position
        console.log('scroll', scrollPosition);
        setTop(scrollPosition >= 140);
    };

    return show === 'DATA' ? (
        <Wrapper
            className="flex flex-row wp-100 wrapper relative"
            showFilters={showFilters}
            is140={isTop}
        >
            <motion.div
                initial={{
                    right: 0,
                    top: 0,
                }}
                animate={{
                    right: showFilters ? 0 : -285,
                    top: isTop ? 10 : 150,
                }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
                className="Home_item flex flex-column"
            >
                {is768 && (
                    <div
                        className="close hand flex items-center justify-center"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? <LeftOutlined /> : <RightOutlined />}
                    </div>
                )}
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
                        onValuesChange={onChangeValues}
                        initialValues={{
                            category: '',
                            method: '',
                            startPrice: '',
                            endPrice: '',
                        }}
                    >
                        {stateCategories.data && stateCategories.data.length > 0 && (
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
                        )}

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

                        {statePayMethods.data && statePayMethods.data.length > 0 && (
                            <KPCollapse identifier="pays" name="Pago">
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
                        )}
                    </Form>
                </div>
            </motion.div>

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
                                onClick={onShowProductDetail}
                            />
                        ))}
                    </div>
                </Spin>
            </div>
        </Wrapper>
    ) : (
        <KPProductDetail product={data} onClose={setShow} />
    );
};

const Wrapper = styled.div<{
    showFilters: boolean;
    is140: boolean;
}>`
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

    @media screen and (max-width: 1100px) {
        .Home_item {
            width: 70%;

            &:first-child {
                width: 30%;
            }
        }

        .Home_item-container-item {
            width: calc(100% / 3 - 20px);
        }
    }

    @media screen and (max-width: 900px) {
        .Home_item {
            width: 65%;

            &:first-child {
                width: 35%;
            }
        }

        .Home_item-container-item {
            width: calc(100% / 2 - 20px);
        }
    }

    @media screen and (max-width: 768px) {
        .Home_item:first-child {
            position: fixed;
            width: 285px !important;
            left: ${({ showFilters }) => (showFilters ? '15px' : '-285px')};
            z-index: 3;
            top: ${({ is140 }) => (is140 ? '10px' : '150px')};
            transition: left 0.3s ease-out;
            -webkit-transition: left top 0.3s ease-out;
            -moz-transition: left top 0.3s ease-out;
            -o-transition: left top 0.3s ease-out;
            -ms-transition: left top 0.3s ease-out;

            .Home_item-filters {
                overflow-y: scroll;
                overflow-x: hidden;
            }

            .close {
                position: absolute;
                right: -27px;
                top: 17%;
                width: 27px;
                height: 30px;
                background-color: var(--quaternary-text-color);
                z-index: 4;
                color: var(--secondary-color);
            }
        }

        .Home_item:last-child {
            width: 100%;
        }

        .Home_item-container-item {
            width: calc(100% / 3 - 20px);
        }
    }

    @media screen and (max-width: 650px) {
        .Home_item-container-item {
            width: calc(100% / 2 - 20px);
        }
    }

    @media screen and (max-width: 500px) {
        .Home_item-container-item {
            width: 100%;
            margin: 0;

            &:not(:first-child) {
                margin-top: 20px;
            }
        }
    }
`;

export default Home;
