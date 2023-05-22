import { FC } from 'react';

import { Collapse } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPText from './KPText';

const { Panel } = Collapse;

export interface KPCollapseProps {
    identifier: string;
    name: string;
    children: JSX.Element | JSX.Element[];
}

const KPCollapse: FC<KPCollapseProps> = (props) => {
    return (
        <Wrapper
            bordered={false}
            collapsible="header"
            defaultActiveKey={[props.identifier]}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
                <LeftOutlined className="hand" rotate={isActive ? 90 : -90} />
            )}
        >
            <Panel
                header={
                    <KPText
                        text={props.name}
                        fontWeight={500}
                        fontSize={16}
                        textColor="--tertiary-text-color"
                    />
                }
                key={props.identifier}
            >
                {props.children}
            </Panel>
        </Wrapper>
    );
};

const Wrapper = styled(Collapse)`
    background-color: transparent;
    border-bottom: 1px solid var(--quaternary-color);
    border-radius: 0px;

    .ant-collapse-header,
    .ant-collapse-content-box {
        padding: 0px !important;
    }

    .ant-collapse-content-box {
        padding-top: 10px !important;
        gap: 10px !important;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
`;

export default KPCollapse;
