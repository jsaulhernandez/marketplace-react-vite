import styled from 'styled-components';
import Header from './components/Header';

const PublicLayout = () => {
    return (
        <Wrapper>
            <Header />
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
`;
export default PublicLayout;
