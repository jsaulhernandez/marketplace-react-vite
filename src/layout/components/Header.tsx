import { useEffect } from 'react';

import { MessageOutlined, NotificationOutlined } from '@ant-design/icons';
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
            <div className="Header_search-bar flex flex-row justify-between items-center">
                <div className="Header_items-logo">
                    <img src="/images/logo/logo.webp" alt="img" />
                </div>
                <div className="Header-items-search">
                    <KPCustomSearch onSearch={onFilter} className="wp-100" />
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
            <div className="Header_informative p-1">
                <div className=""></div>
                <div></div>
            </div>
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
        padding: 10px 3%;
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
`;

export default Header;
