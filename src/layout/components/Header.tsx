import { useEffect } from 'react';

import styled from 'styled-components';

import KPCustomSearch from '@components/KPCustomSearch';

import { useFilter } from '@hooks/useFilter.hook';

const Header = () => {
    const {
        methods: { getProducts },
        filters,
    } = useFilter();

    useEffect(() => {
        getProducts();
    }, []);

    const onFilter = (search: string) => {
        getProducts(filters, search);
    };

    return (
        <Wrapper>
            <div className="Header_search-bar flex flex-row justify-between p-1 items-center">
                <div className="Header_items-logo">
                    <img src="/" alt="img" />
                </div>
                <div className="Header-items-search">
                    <KPCustomSearch onSearch={onFilter} className="wp-100" />
                </div>
                <div className="Header-items-session">items</div>
            </div>
            <div className="Header_informative p-1"></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 140px;

    .Header_search-bar,
    .Header_informative {
        border-bottom: 2px solid var(--quaternary-color);
    }

    .Header_search-bar {
        height: 90px;
    }

    .Header_informative {
        height: 50px;
    }

    .Header-items-search {
        min-width: 600px;
    }
`;

export default Header;
