import { useEffect } from 'react';

import { AimOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPCustomSearch from '@components/KPCustomSearch';
import KPText from '@components/KPText';

import { useFilter } from '@hooks/useFilter.hook';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {
        methods: { getProducts },
        filters,
    } = useFilter();

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

    return (
        <Wrapper>
            <div className="Header_search-bar flex flex-row flex-wrap justify-between items-center g-10 relative">
                <div className="Header_items-logo hand" onClick={redirectToHome}>
                    <img src="/images/logo/logo.webp" alt="img" />
                </div>

                <div className="Header-items-search">
                    <KPCustomSearch
                        onSearch={onFilter}
                        className="custom-search wp-100"
                    />
                </div>

                <div className="Header-items-session flex flex-row g-20">
                    <div className="notifications flex items-center">
                        <NotificationOutlined className="icon hand" />
                        <MessageOutlined className="icon hand" />
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

const Wrapper = styled.div`
    height: 140px;

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
        gap: 20px;
        color: var(--quaternary-text-color);

        .icon {
            transform: scale(1.5);

            &:hover {
                color: var(--primary-color);
            }
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

    @media screen and (max-width: 650px) {
        /* .Header-items-search {
            position: absolute;
        } */
    }
`;

export default Header;
