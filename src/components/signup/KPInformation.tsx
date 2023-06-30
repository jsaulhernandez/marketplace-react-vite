import { FC, useEffect, useState } from 'react';

import ReactInputMask from 'react-input-mask';

import { Checkbox, Form, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import dayjs, { Dayjs } from 'dayjs';

import KPButton from '@components/KPButton';
import KPInput from '@components/KPInput';

import useAxios from '@hooks/useAxios.hook';

import { CustomerModel } from '@interfaces/Customer.model';
import { TypeDocumentModel } from '@interfaces/TypeDocument.model';

import { errorMessage } from '@constants/Constants.constants';

interface KPInformationProps {
    data?: CustomerModel;
    onSubmit: (value: CustomerModel) => void;
    onBack: () => void;
    className?: string;
}

const KPInformation: FC<KPInformationProps> = (props) => {
    const [stateTypesDocuments, fetchTypesDocuments] = useAxios<TypeDocumentModel[]>();
    const [, fetchValidateDocument] = useAxios<boolean>();

    const [form] = useForm<CustomerModel>();

    const [document, setTypeDocument] = useState<TypeDocumentModel>();

    useEffect(() => {
        fetchTypesDocuments({
            method: 'GET',
            path: '/type-document/web/active',
        });
    }, []);

    useEffect(() => {
        if (stateTypesDocuments.data && props.data?.typeDocument) {
            setTypeDocument(
                stateTypesDocuments.data?.find(
                    (td) => td.id?.toString() === props.data?.typeDocument.id?.toString(),
                ),
            );
        }
    }, [stateTypesDocuments.isSuccess]);

    const onFinish = (values: CustomerModel) => {
        if (values.dateBirth) values.dateBirth = dayjs(values.dateBirth).toISOString();

        props.onSubmit({
            ...values,
            terms: values.terms ? 1 : 0,
        });
    };

    const onDisabledDates = (date: Dayjs) => {
        return date && date > dayjs().subtract(18, 'years').endOf('year');
    };

    const onChangeDocument = (id: string) => {
        setTypeDocument(stateTypesDocuments.data?.find((td) => td.id?.toString() === id));
    };

    const existsCustomerDocument = async (value: string) => {
        try {
            const length =
                document?.masking.replaceAll('-', '').replaceAll('_', '').length ?? 0;
            const valueLength = value.replaceAll('-', '').replaceAll('_', '').length;

            if (valueLength < length) return;

            const response = await fetchValidateDocument({
                method: 'GET',
                path: '/customer/web/exists-document',
                queries: {
                    document: value,
                },
            });

            if (response.isSuccess && response.data)
                return Promise.reject('El documento ya se encuentra registrado.');
        } catch (error) {
            console.log('[ERROR]', error);
        }
    };

    return (
        <WrapperInformation className="KPInformation flex flex-column wp-100 mt-5">
            <Form
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                className={`KPInformation_form ${props.className ? props.className : ''}`}
                initialValues={{
                    ...props.data,
                    terms: props.data?.terms ? true : false,
                    typeDocument: {
                        id: props.data?.typeDocument.id?.toString(),
                    },
                    dateBirth: props.data?.dateBirth
                        ? dayjs(props.data?.dateBirth)
                        : null,
                    document: props.data?.document,
                }}
            >
                <div className="kp-row">
                    <div className="kp-column-50">
                        <label htmlFor="firstName">
                            Primer nombre<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: errorMessage,
                                },
                            ]}
                        >
                            <KPInput />
                        </Form.Item>
                    </div>

                    <div className="kp-column-50">
                        <label htmlFor="secondName">Segundo nombre</label>
                        <Form.Item hasFeedback name="secondName">
                            <KPInput />
                        </Form.Item>
                    </div>
                </div>

                <div className="kp-row">
                    <div className="kp-column-50">
                        <label htmlFor="firstLastName">
                            Primer apellido<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="firstLastName"
                            rules={[
                                {
                                    required: true,
                                    message: errorMessage,
                                },
                            ]}
                        >
                            <KPInput />
                        </Form.Item>
                    </div>

                    <div className="kp-column-50">
                        <label htmlFor="secondLastName">Segundo apellido</label>
                        <Form.Item hasFeedback name="secondLastName">
                            <KPInput />
                        </Form.Item>
                    </div>
                </div>

                <div className="kp-row">
                    <div className="kp-column-50">
                        <label htmlFor="dateBirth">
                            Fecha de nacimiento<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="dateBirth"
                            rules={[
                                {
                                    required: true,
                                    message: errorMessage,
                                },
                            ]}
                        >
                            <KPInput
                                typeInput="date"
                                placeholder="DD/MM/YYYY"
                                disabledDate={onDisabledDates}
                            />
                        </Form.Item>
                    </div>

                    <div className="kp-column-50">
                        <label htmlFor="typeDocument">
                            Tipo de documento<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name={['typeDocument', 'id']}
                            rules={[
                                {
                                    required: true,
                                    message: errorMessage,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="Seleccionar documento"
                                loading={stateTypesDocuments.isLoading}
                                onChange={onChangeDocument}
                            >
                                {stateTypesDocuments.data?.map((td) => (
                                    <Select.Option key={td.id}>{td.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <div className="kp-row">
                    <div className="kp-column-50">
                        <label htmlFor="document">
                            N&uacute;mero de documento<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="document"
                            rules={[
                                {
                                    required: true,
                                    message: errorMessage,
                                },
                                {
                                    len: document?.masking.length || 0,
                                    message: 'El documento es incorrecto',
                                },
                                {
                                    validator: (_, value) =>
                                        existsCustomerDocument(value),
                                },
                            ]}
                        >
                            <ReactInputMask
                                mask={document?.masking || ''}
                                maskChar={null}
                                placeholder={document?.masking ?? ''}
                            >
                                {/* @ts-ignore */}
                                {(input) => <KPInput />}
                            </ReactInputMask>
                        </Form.Item>
                    </div>

                    <div className="kp-column-50">
                        <label htmlFor="phone">
                            Tel&eacute;fono<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: errorMessage,
                                },
                            ]}
                        >
                            <KPInput />
                        </Form.Item>
                    </div>
                </div>

                <div className="kp-row">
                    <Form.Item
                        hasFeedback
                        name="terms"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Los terminos y condiciones se deben aceptar',
                                              ),
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>Aceptar terminos y condiciones</Checkbox>
                    </Form.Item>
                </div>

                <div className="flex justify-center items-center g-20">
                    <KPButton
                        type="secondary"
                        onClick={props.onBack}
                        prefix={<LeftOutlined />}
                    >
                        Volver
                    </KPButton>
                    <KPButton type="primary" htmlType="submit" suffix={<RightOutlined />}>
                        Siguiente
                    </KPButton>
                </div>
            </Form>
        </WrapperInformation>
    );
};

const WrapperInformation = styled.div`
    @media screen and (max-width: 1024px) {
        justify-content: center;

        .KPInformation_form .kp-row {
            flex-direction: column;
            gap: 0px;

            .kp-column-50 {
                width: 100%;
            }
        }
    }
`;

export default KPInformation;
