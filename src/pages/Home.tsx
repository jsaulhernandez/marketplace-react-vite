import { Select } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPPagination from '@components/KPPagination';
import KPText from '@components/KPText';
import KPProduct from '@components/producst/KPProduct';
import KPItemFilter from '@components/KPItemFilter';
import KPCollapse from '@components/KPCollapse';
import { PRICES_FILTERS } from '@constants/Constants.constanst';
import KPInput from '@components/KPInput';

const Home = () => {
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

                    <KPCollapse identifier="categories" name="Categorías">
                        <KPItemFilter label="AirPods" />
                        <KPItemFilter label="iPad" />
                        <KPItemFilter label="Macbook" />
                    </KPCollapse>

                    <KPCollapse identifier="prices" name="Precios">
                        <div className="Home_item-filters-prices flex flex-row flex-wrap g-10">
                            <KPInput
                                placeholder="Minímo"
                                addonBefore={<DollarCircleOutlined />}
                            />
                            <KPInput
                                placeholder="Máximo"
                                addonBefore={<DollarCircleOutlined />}
                            />
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
                        <KPItemFilter label="Paypal" />
                        <KPItemFilter label="Gopay" />
                    </KPCollapse>
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
