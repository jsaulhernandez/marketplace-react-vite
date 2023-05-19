import { FC } from 'react';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPText from './KPText';

export interface KPPaginationProps {
    current?: number;
    onChange?: (page: number, pageSize?: number) => void;
    pageSize?: number;
    total?: number;
}

const KPPagination: FC<KPPaginationProps> = (props) => {
    const disableLeft = (): boolean => {
        if (!props) return false;

        const { current } = props;
        if (typeof current === 'undefined' || typeof current !== 'number') return false;
        if (current > 0) return false;

        return true;
    };

    const disableRight = () => {
        if (!props) return false;

        const { current, pageSize, total } = props;
        if (typeof current === 'undefined' || typeof current !== 'number') return false;
        if (typeof pageSize === 'undefined' || typeof pageSize !== 'number') return false;
        if (typeof total === 'undefined' || typeof total !== 'number') return false;

        const result = (current + 1) * pageSize;

        if (total <= result) return true;

        return false;
    };

    const getCurrent = (): string | number => {
        if (!props) return '0';

        const { current, pageSize, total } = props;
        if (!pageSize) return '0';
        if (typeof current === 'undefined' || typeof current !== 'number') return '0';
        if (typeof total !== 'undefined' && total === 0) return 0;

        const result = (current + 1) * pageSize - pageSize;

        return result + 1;
    };

    const getTotal = (): string | number => {
        if (!props) return '0';

        const { current, pageSize, total } = props;
        if (typeof current === 'undefined' || typeof current !== 'number') return '0';
        if (typeof pageSize === 'undefined' || typeof pageSize !== 'number') return '0';
        if (typeof total === 'undefined' || typeof total !== 'number') return '0';

        const result = (current + 1) * pageSize;
        if (result >= total) return total;

        return result;
    };

    const onChangePage = (type: 'up' | 'down') => {
        if (!props) return;
        const { pageSize, current, onChange } = props;

        if (!pageSize) return;
        if (typeof current !== 'number') return;

        if (onChange && type === 'up') onChange(current + 1, pageSize);
        if (onChange && type === 'down') onChange(current - 1, pageSize);
    };

    return (
        <Wrapper className="flex flex-start flex-wrap">
            <KPText
                text={`Mostrando ${getCurrent()} - ${getTotal()} de un total de ${
                    props.total ?? 0
                }`}
                textColor="--primary-text-color"
            />
            {props.total && (
                <>
                    &nbsp;
                    <div className="arrows">
                        <LeftArrow
                            className={`hand ${disableLeft() ? 'disabled' : ''}`}
                            onClick={
                                !disableRight() ? () => onChangePage('up') : undefined
                            }
                        />
                        <RightArrow
                            className={`hand ${disableRight() ? 'disabled' : ''} `}
                            onClick={
                                !disableRight() ? () => onChangePage('up') : undefined
                            }
                        />
                    </div>
                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const LeftArrow = styled(LeftOutlined)`
    color: var(--primary-text-color);

    &.disabled {
        color: #000;
    }

    &:hover {
        transform: scale(1.1);
    }
`;

const RightArrow = styled(RightOutlined)`
    color: var(--primary-text-color);

    &.disabled {
        color: #000;
    }

    &:hover {
        transform: scale(1.1);
    }
`;
export default KPPagination;
