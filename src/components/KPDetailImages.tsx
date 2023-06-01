import { FC, useState } from 'react';

import styled from 'styled-components';
import KPLoadImage from './KPLoadImage';

export interface KPDetailImagesProps {
    images?: string[];
}

const KPDetailImages: FC<KPDetailImagesProps> = (props) => {
    const [selected, setSelected] = useState<string>(
        props?.images ? (props.images.length > 0 ? props.images[0] : '') : '',
    );

    return (
        <Wrapper className="flex flex-column g-20">
            <KPLoadImage borderRadius={10} image={selected} />

            <div className="flex flex-wrap g-10">
                {props.images?.map((image, i) => (
                    <KPLoadImage
                        image={image}
                        className="item"
                        borderRadius={10}
                        isHover
                        isActive={image === selected}
                        onClick={setSelected}
                        key={i}
                    />
                ))}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .item {
        width: calc(100% / 4 - 8px);
        padding: 10px;
    }
`;

export default KPDetailImages;
