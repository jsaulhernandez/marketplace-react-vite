import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from 'antd';
import {
    AimOutlined,
    MessageOutlined,
    NotificationOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

import KPCustomSearch from '@components/KPCustomSearch';
import KPText from '@components/KPText';

import { useFilter } from '@hooks/useFilter.hook';
import { useResize } from '@hooks/useResize.hook';
import { useCart } from '@hooks/useCart.hook';

const Header = () => {
    const {
        methods: { getProducts },
        filters,
    } = useFilter();
    const [is630] = useResize(630);
    const { saleDetails, subTotal } = useCart();

    const [showSearch, setShowSearch] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const onFilter = (search: string) => {
        getProducts(filters, search);
    };

    const redirectToHome = () => {
        navigate('/kplace/home');
    };

    const redirectToCart = () => {
        navigate('/kplace/cart');
    };

    return (
        <Wrapper showSearchBar={showSearch}>
            <div className="Header_search-bar flex flex-row flex-wrap justify-between items-center g-10 relative">
                <div className="Header_items-logo hand" onClick={redirectToHome}>
                    <img src="/images/logo/logo.webp" alt="img" />
                </div>

                <div
                    className={`Header-items-search ${
                        is630 ? 'Header-items-hide-search absolute' : ''
                    }`}
                >
                    <KPCustomSearch
                        onSearch={onFilter}
                        className="custom-search wp-100"
                        showClose={showSearch}
                        onClose={setShowSearch}
                    />
                </div>

                <div className="Header-items-session flex flex-row g-20">
                    <div className="notifications flex items-center">
                        {is630 && (
                            <SearchOutlined
                                className="icon hand icon-search"
                                onClick={() => setShowSearch(!showSearch)}
                            />
                        )}
                        <Badge
                            count={saleDetails.length}
                            overflowCount={10}
                            offset={[5, -5]}
                            showZero
                            size="small"
                        >
                            <ShoppingCartOutlined
                                className="icon hand"
                                onClick={redirectToCart}
                            />
                        </Badge>
                        <NotificationOutlined className="icon hand" />
                    </div>
                    <div className="separator relative"></div>
                    <div className="account hand flex items-center relative">
                        <img src="/images/icons/account.webp" height={40} alt="account" />
                    </div>
                </div>
            </div>

            <div className="Header_informative flex items-center justify-between p-1 g-10">
                <div className="categories flex flex-row flex-wrap g-10">
                    <KPText text="Macbook" />
                    <KPText text="iPhone" />
                    <KPText text="iPad" />
                </div>
                <div className="location flex flex-row flex-wrap g-5">
                    <AimOutlined className="icon" />
                    <KPText text="Envíos a" />
                    <KPText
                        text="El Salvador"
                        fontWeight={700}
                        textColor="--primary-text-color"
                    />
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div<{
    showSearchBar?: boolean;
}>`
    width: 100vw;
    height: 140px;
    position: fixed;
    z-index: 100;
    background-color: var(--secondary-color);

    .Header_search-bar,
    .Header_informative {
        padding: 10px 3%;
        border-bottom: 2px solid var(--quaternary-color);
    }

    .Header_search-bar {
        height: 90px;
    }

    .Header_informative {
        height: 50px;
    }

    .Header_items-logo img {
        height: 45px;
    }

    .Header-items-search {
        min-width: 600px;
    }

    .Header-items-session .notifications {
        gap: 30px;

        .icon {
            color: var(--quaternary-text-color);
            transform: scale(1.5);

            &:hover {
                color: var(--primary-color);
            }
        }

        .icon-search {
            rotate: 90deg;
        }
    }

    .Header-items-session .separator::before {
        position: absolute;
        background-color: var(--quaternary-color);
        content: '';
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
    }

    .Header-items-session .account img {
        height: 30px;
        border-radius: 50px;
        border: 2px solid transparent;

        &:hover {
            border-color: var(--primary-color);
        }
    }

    .Header_informative .location .icon {
        color: var(--secondary-text-color);
    }

    @media screen and (max-width: 1000px) {
        .Header-items-search {
            min-width: 400px;
        }
    }

    @media screen and (max-width: 768px) {
        .Header-items-search {
            min-width: 280px;
            max-width: 280px;
        }
    }

    @media screen and (max-width: 630px) {
        .Header-items-hide-search {
            z-index: 3;
            min-width: calc(100% - 6%);
            top: ${({ showSearchBar }) => (showSearchBar ? '20px' : '-60px')};
            z-index: 3;
            height: calc(100% - 40px);
            transition: top 0.3s ease-out;
            -webkit-transition: top 0.3s ease-out;
            -moz-transition: top 0.3s ease-out;
            -o-transition: top 0.3s ease-out;
            -ms-transition: top 0.3s ease-out;
        }
    }
`;

export default Header;
