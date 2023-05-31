import { FC } from 'react';
import styled, { CSSProperties } from 'styled-components';

export interface KPDotsColorProps {
    colors?: string[];
    cssProperties?: CSSProperties;
    className?: string;
    isHover?: boolean;
    active?: string;
    onClick?: (value: string) => void;
}

const KPDotsColor: FC<KPDotsColorProps> = ({
    isHover = false,
    active = '',
    ...props
}) => {
    return (
        <Wrapper className="flex flex-row flex-wrap mt-1 mb-1">
            {props.colors?.map((x, i) => (
                <Dot
                    color={x}
                    key={i}
                    style={props.cssProperties}
                    className={`${props.className ? props.className : ''} ${
                        isHover ? 'isHover hand' : ''
                    } ${active === x ? 'active' : ''} `}
                    onClick={() => props.onClick && props.onClick(x)}
                />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    gap: 10px;

    .isHover {
        position: relative;
        width: 25px !important;
        height: 25px !important;
    }

    .isHover:hover,
    .active {
        border: 1px solid var(--secondary-color);
        outline: 2px solid var(--primary-color);
    }
`;

const Dot = styled.div<{
    color?: string;
}>`
    width: 15px;
    height: 15px;
    background-color: ${({ color }) => color ?? 'transparent'};
    border-radius: 50px;
`;

export default KPDotsColor;
