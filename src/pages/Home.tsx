import { Select } from 'antd';
import styled from 'styled-components';

import KPPagination from '@components/KPPagination';
import KPText from '@components/KPText';
import KPProduct from '@components/producst/KPProduct';

const Home = () => {
    return (
        <Wrapper className="flex flex-row wp-100">
            <div className="Home_item flex flex-column p-1">
                <KPText
                    text="Filtros"
                    fontWeight={700}
                    fontSize={16}
                    textColor="--primary-text-color"
                />
            </div>

            <div className="Home_item flex flex-column p-1">
                <div className="Home_item-filters flex flex-row justify-between items-center flex-wrap">
                    <div className="Home_item-filters-page flex flex-row flex-wrap">
                        <KPPagination />

                        <div className="flex flex-row">
                            <KPText text="para" textColor="--primary-text-color" />
                            &nbsp;
                            <KPText
                                text="search"
                                className="Home_item-filters-page-search-for"
                                fontWeight={700}
                            />
                        </div>
                    </div>

                    <div className="Home_item-filters-sort">
                        <div className="kp-item-row">
                            <label>Ordenar por:</label>
                            <Select className="select" defaultValue="desc">
                                <Select.Option key="desc">Más reciente</Select.Option>
                                <Select.Option key="asc">Más antiguo</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="Home_item-container flex flex-row flex-wrap wp-100">
                    <KPProduct className="Home_item-container-item" />
                    <KPProduct className="Home_item-container-item" />
                    <KPProduct className="Home_item-container-item" />
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
            background-color: var(--secondary-color);
            min-height: 300px;
            border: 2px solid var(--quaternary-color);
            border-radius: 10px;
        }
    }

    .Home_item-filters-page {
        gap: 5px;

        .Home_item-filters-page-search-for {
            color: var(--primary-color);
        }
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
