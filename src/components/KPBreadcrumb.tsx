import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { RoutesList } from '../routes';

export interface KPBreadcrumbProps {
    titles?: ItemType[];
    className?: string;
}

const KPBreadcrumb: FC<KPBreadcrumbProps> = (props) => {
    const { pathname } = useLocation();

    const buildingItems = (): ItemType[] => {
        let items: ItemType[] = [];
        const getItem = RoutesList.find((r) => r.path === pathname);

        if (!getItem) return items;

        items.push({ title: getItem.title });

        items = items.concat(props?.titles ?? []);

        return items;
    };

    return (
        <Wrapper
            separator={<RightOutlined />}
            items={buildingItems()}
            className={`${props.className ? props.className : ''}`}
        />
    );
};

const Wrapper = styled(Breadcrumb)`
    .ant-breadcrumb-separator {
        margin-inline: 25px;
    }
`;

export default KPBreadcrumb;
