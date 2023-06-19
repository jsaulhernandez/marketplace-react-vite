import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';

export interface PublicLayoutProps {
    className?: string;
}

export const HEADER_HEIGHT = '140px';

const Layout: FC<PublicLayoutProps> = ({ className }) => {
    return (
        <Wrapper>
            <Header />
            <div
                className={`container flex flex-column wp-100 ${
                    className ? className : ''
                }`}
            >
                <Outlet />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-color: var(--tertiary-color);
    overflow: hidden;

    .container {
        margin-top: ${() => `${HEADER_HEIGHT}`};
        min-height: ${() => `calc(100vh - ${HEADER_HEIGHT})`};
    }
`;
export default Layout;
