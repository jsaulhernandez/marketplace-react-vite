import { FC } from 'react';

import styled from 'styled-components';

import KPText from '@components/KPText';

interface KPInformativeProps {
    firstText: string;
    secondText: string;
    className?: string;
}

const KPInformative: FC<KPInformativeProps> = (props) => {
    return (
        <Wrapper
            className={`flex flex-column justify-center items-center g-20 ${
                props.className ? props.className : ''
            }`}
        >
            <KPText
                text={props.firstText}
                fontSize={50}
                textColor="--secondary-color"
                fontWeight={700}
            />

            <KPText text={props.secondText} fontSize={20} textColor="--secondary-color" />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: var(--primary-color);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export default KPInformative;
