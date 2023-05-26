import { FC } from 'react';
import styled from 'styled-components';

export interface KPDotsColorProps {
    colors?: string[];
}

const KPDotsColor: FC<KPDotsColorProps> = ({ colors = ['red', 'green', 'grey'] }) => {
    return (
        <Wrapper className="flex flex-row flex-wrap mt-1 mb-1">
            {colors.map((x) => (
                <Dot color={x} />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    gap: 10px;
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
