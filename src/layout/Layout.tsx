import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';

export interface PublicLayoutProps {
    className?: string;
}

const HEADER_HEIGHT = '120px';

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
    background: white;
    overflow: hidden;

    .container {
        padding: 2% 4%;
        background-color: var(--tertiary-color);
        min-height: ${() => `calc(100vh - ${HEADER_HEIGHT})`};
    }
`;
export default Layout;
