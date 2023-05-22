import { Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPInput from '@components/KPInput';

const Header = () => {
    return (
        <Wrapper>
            <div className="Header_search-bar flex flex-row justify-between p-1 items-center">
                <div className="Header_items-logo">
                    <img src="/" alt="img" />
                </div>
                <div className="Header-items-search">
                    <Space.Compact>
                        <KPInput
                            prefix={<SearchOutlined />}
                            placeholder="Buscar Macbook pro....."
                        />
                        <Button type="primary">Submit</Button>
                    </Space.Compact>
                </div>
                <div className="Header-items-session">items</div>
            </div>
            <div className="Header_informative p-1"></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 120px;

    .Header_search-bar,
    .Header_informative {
        border-bottom: 2px solid var(--quaternary-color);
    }

    .Header_search-bar {
        height: 70px;
    }

    .Header_informative {
        height: 50px;
    }
`;

export default Header;
