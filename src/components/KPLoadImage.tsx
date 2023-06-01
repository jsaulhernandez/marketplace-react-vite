import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export interface KPLoadImageProps {
    image?: string;
    borderRadius?: number;
    className?: string;
    isHover?: boolean;
    isActive?: boolean;
    onClick?: (value: string) => void;
}

const KPLoadImage: FC<KPLoadImageProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>();

    useEffect(() => {
        setWidth(ref.current?.offsetWidth);
    }, [ref]);

    return (
        <Wrapper
            className={`flex items-center justify-center wp-100 ${
                props.className ? props.className : ''
            } ${props.isHover ? 'isHover hand' : ''} ${props.isActive ? 'active' : ''}`}
            border={props.borderRadius}
            onClick={() => props.onClick && props.onClick(props.image ?? '')}
            ref={ref}
            width={width}
        >
            <img src={props.image} alt="image" />
        </Wrapper>
    );
};

const Wrapper = styled.div<{
    border?: number;
    width?: number;
}>`
    background-color: var(--quaternary-color);
    border-radius: ${({ border }) => (border ? `${border}px` : '0px')};
    padding: 50px;
    height: ${({ width }) => (width ? `${width}px` : 'auto')};

    img {
        width: 100%;
    }

    &.isHover:hover,
    &.active {
        border: 2px solid var(--primary-color);
    }
`;

export default KPLoadImage;
