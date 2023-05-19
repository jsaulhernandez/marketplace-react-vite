import { FC } from 'react';
import { Rate } from 'antd';
import styled from 'styled-components';

import KPText from '@components/KPText';
import KPDotsColor from './KPDotsColor';

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

            <div className="footer">
                <div className="flex flex-row flex-wrap items-center mb-1">
                    <KPText
                        text="$882"
                        fontWeight={700}
                        fontSize={20}
                        textColor="--primary-text-color"
                    />
                    <KPText
                        text="$1012"
                        marginLeft={10}
                        textDecoration="line-through"
                        textDecorationColor="red"
                    />
                </div>

                <KPText text="Apple Macbook Air M1" textColor="--tertiary-text-color" />
                <KPText text="256 GB | 512  GB" textColor="--tertiary-text-color" />

                <KPDotsColor />

                <div className="informative flex flex-row flex-wrap items-center">
                    <Rate allowHalf className="flex flex-wrap  items-center" />
                    <KPText
                        text="| 655 ventas"
                        textColor="--tertiary-text-color"
                        fontSize={10}
                    />
                </div>
            </div>
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

    .informative {
        gap: 5px;
    }
`;

export default KPProduct;
