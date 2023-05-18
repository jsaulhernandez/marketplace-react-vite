import styled from 'styled-components';

const Header = () => {
    return (
        <Wrapper>
            <div className="Header_items-informative">
                <img src="/" alt="img" />
                <input />
            </div>
            <div className="Header-items-session">items</div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-bottom: 1px solid grey;
    height: 60px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`;

export default Header;
