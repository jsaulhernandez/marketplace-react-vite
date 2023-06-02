import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Tabs, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import styled from 'styled-components';

import KPBreadcrumb from '@components/KPBreadcrumb';
import KPDotsColor from '../products/KPDotsColor';
import KPText from '../KPText';
import KPDetailImages from '../KPDetailImages';
import KPItemFilter from '../KPItemFilter';
import KPPurchaseForm from './KPPurchaseForm';

import { SHOWING } from '@constants/Constants.constants';

import { ProductModel } from '@interfaces/Product.model';

export interface KPProductDetailProps {
    product?: ProductModel;
    onClose?: (value: SHOWING) => void;
}

export interface Tab {
    label: ReactNode;
    key: string;
    children: ReactNode;
}

const KPProductDetail: FC<KPProductDetailProps> = (props) => {
    const [colorActive, setColorActive] = useState<number>();
    const [processorActive, setProcessorActive] = useState<number>();
    const [memorySizeActive, setMemorySizeActive] = useState<number>();
    const [tabs, setTabs] = useState<Tab[]>([]);

    const refDiv = useRef<HTMLDivElement>(null);
    const [heightForm, setHeightForm] = useState<number>();
    const [dif, setDif] = useState<number>();

    useEffect(() => {
        getContent();
    }, []);

    useEffect(() => {
        setDif((heightForm ?? 0) - (refDiv.current?.offsetHeight ?? 0));
    }, [refDiv, heightForm]);

    useEffect(() => {
        console.log('dif', dif);
    }, [dif]);

    const getItems = (): ItemType[] => {
        let items: ItemType[] = [];

        if (props.product) {
            items.push({ title: props.product.category.name ?? '-' });
            items.push({
                title:
                    (
                        <KPText
                            text={props.product?.name ?? ''}
                            fontWeight={700}
                            textColor="--tertiary-text-color"
                        />
                    ) ?? '-',
            });
        }

        return items;
    };

    const getContent = (): void => {
        const items: Tab[] = [
            {
                key: 'detail',
                label: <KPText text="Detalle" textColor="--secondary-text-color" />,
                children: props.product?.detail ?? '',
            },
            {
                key: 'specifications',
                label: (
                    <KPText text="Especifiaciones" textColor="--secondary-text-color" />
                ),
                children: props.product?.specification ?? '',
            },
        ];

        setTabs(items.filter((i) => i.children !== ''));
    };

    return (
        <Wrapper
            className="flex flex-column"
            dif={dif ? (dif > 0 ? dif + 10 : undefined) : undefined}
        >
            <div className="KPProductDetail_breadcrumb flex flex-wrap justify-between items-center g-10 relative">
                <KPBreadcrumb titles={getItems()} className="mr-2" />

                <Tooltip title="Cerrar">
                    <CloseCircleOutlined
                        className="close hand absolute"
                        onClick={() => props.onClose && props.onClose('DATA')}
                    />
                </Tooltip>
            </div>

            <div className="KPProductDetail_data flex pt-2 g-20">
                <div className="KPProductDetail_data-item flex flex-row g-20">
                    <div
                        className="KPProductDetail_data-item-information flex flex-column"
                        ref={refDiv}
                    >
                        <KPDetailImages
                            images={[
                                '/images/m1.jpg',
                                '/images/m2.jpg',
                                '/images/m3.jpg',
                                '/images/m4.jpg',
                            ]}
                        />
                    </div>

                    <div className="KPProductDetail_data-item-information flex flex-column pl-1 pr-1 g-10">
                        <div className="section flex flex-column g-10">
                            <KPText
                                text={props.product?.name ?? ''}
                                fontSize={20}
                                fontWeight={700}
                                type="h1"
                                textColor="--tertiary-text-color"
                            />

                            <KPText
                                text={`$${props.product?.price ?? '0'}`}
                                fontSize={25}
                                fontWeight={700}
                                textColor="--primary-text-color"
                            />
                        </div>

                        <div className="section flex flex-column g-10">
                            {props.product?.color && props.product?.color.length > 0 && (
                                <div>
                                    <KPText
                                        text="Colores"
                                        textColor="--tertiary-text-color"
                                        fontWeight={600}
                                    />
                                    {props.product?.color && (
                                        <KPDotsColor
                                            colors={props.product.color}
                                            isHover
                                            active={colorActive}
                                            onClick={setColorActive}
                                        />
                                    )}
                                </div>
                            )}

                            {props.product?.processor &&
                                props.product?.processor.length > 0 && (
                                    <div>
                                        <KPText
                                            text="Procesador"
                                            textColor="--tertiary-text-color"
                                            fontWeight={600}
                                        />
                                        <div className="flex flex-row flex-wrap g-10">
                                            {props.product?.processor.map((p, i) => (
                                                <KPItemFilter
                                                    label={p.name}
                                                    value={p.id}
                                                    type="amount"
                                                    key={i}
                                                    className="mt-1"
                                                    active={processorActive === p.id}
                                                    onClick={(value) =>
                                                        setProcessorActive(Number(value))
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                            {props.product?.memorySize &&
                                props.product?.memorySize.length > 0 && (
                                    <div className="mt-1">
                                        <KPText
                                            text="Almacenamiento"
                                            textColor="--tertiary-text-color"
                                            fontWeight={600}
                                        />
                                        <div className="flex flex-row flex-wrap g-10">
                                            {props.product?.memorySize.map((p, i) => (
                                                <KPItemFilter
                                                    label={p.value}
                                                    value={p.id}
                                                    type="amount"
                                                    key={i}
                                                    className="mt-1"
                                                    active={memorySizeActive === p.id}
                                                    onClick={(value) =>
                                                        setMemorySizeActive(Number(value))
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                        </div>

                        <div className="section flex flex-column g-10"></div>

                        {tabs.length > 0 && (
                            <div className="section flex flex-column g-10">
                                <Tabs items={tabs} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="KPProductDetail_data-item">
                    <KPPurchaseForm
                        stock={props.product?.stock}
                        price={props.product?.price}
                        onSetHeight={setHeightForm}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div<{
    dif?: number;
}>`
    .KPProductDetail_breadcrumb .close {
        transform: scale(1.5);
        color: var(--quaternary-text-color);
        right: 0;
        top: 4px;

        &:hover {
            color: var(--primary-color);
        }
    }

    .KPProductDetail_data-item {
        width: 80%;

        &:nth-child(2) {
            width: 20%;
            background-color: transparent;
        }

        .section {
            :not(:first-child) {
                padding-top: 10px;
            }

            :not(:last-child) {
                border-bottom: 1px solid var(--quaternary-color);
                padding-bottom: 10px;
            }

            :last-child {
                gap: 0px;
                padding-top: 0px;
            }
        }
    }

    .KPProductDetail_data-item-information {
        width: 40%;

        &:nth-child(2) {
            width: 60%;
        }
    }

    .ant-tabs .ant-tabs-tab:hover {
        p {
            color: var(--primary-color);
        }
    }

    .ant-tabs .ant-tabs-tab-active p {
        color: var(--primary-color);
        font-weight: 500 !important;
    }

    @media screen and (max-width: 1300px) {
        .KPProductDetail_data-item {
            width: 75%;

            &:nth-child(2) {
                width: 25%;
            }
        }
    }

    @media screen and (max-width: 925px) {
        .KPProductDetail_data-item {
            width: 70%;

            &:nth-child(2) {
                width: 30%;
            }
        }
    }

    @media screen and (max-width: 775px) {
        .KPProductDetail_data-item {
            width: 60%;

            &:nth-child(1) {
                flex-direction: column;
            }

            &:nth-child(2) {
                width: 40%;
            }
        }

        .KPProductDetail_data-item-information {
            width: 100% !important;

            &:nth-child(2) {
                width: calc(100vw - 9%) !important;
            }
        }
    }

    @media screen and (max-width: 675px) {
        .KPProductDetail_data-item {
            width: 50%;

            &:nth-child(2) {
                width: 50%;
            }
        }

        .KPProductDetail_data-item-information:nth-child(2) {
            margin-top: ${({ dif }) => (dif ? `${dif}px` : '0px')};
        }
    }

    @media screen and (max-width: 500px) {
        .KPProductDetail_data {
            padding-left: 7%;
            padding-right: 7%;
            padding-bottom: 8%;
            flex-direction: column;
        }

        .KPProductDetail_data-item {
            width: 100% !important;
        }

        .KPProductDetail_data-item-information:nth-child(2) {
            width: 100% !important;
            margin-top: 0px;
        }
    }
`;

export default KPProductDetail;
