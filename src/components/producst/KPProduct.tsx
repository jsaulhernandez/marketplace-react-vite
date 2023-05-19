import { FC } from 'react';
import styled from 'styled-components';

export interface KPProductProps {
    className?: string;
    onClick?: () => void;
}

const KPProduct: FC<KPProductProps> = (props) => {
    return (
        <Wrapper
            className={`flex flex-column wp-100 hand ${
                props.className ? props.className : ''
            }`}
            onClick={() => props.onClick && props.onClick()}
        >
            <div className="image-container flex items-center justify-center">
                <img src="/" alt="product" />
            </div>
            <div className="footer">dd</div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border: 2px solid var(--quaternary-color);
    border-radius: 10px;

    &:hover {
        box-shadow: 0 20px 30px -30px rgba(0, 0, 0, 0.3);
    }

    .image-container {
        height: 150px;
        background-color: var(--quaternary-color);
    }

    .footer {
        padding: 10px;
    }
`;

export default KPProduct;
