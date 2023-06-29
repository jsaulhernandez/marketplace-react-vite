import { FC } from 'react';

import { Checkbox, Form, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import dayjs, { Dayjs } from 'dayjs';

import KPButton from '@components/KPButton';
import KPInput from '@components/KPInput';

import { CustomerModel } from '@interfaces/Customer.model';

import { errorMessage } from '@constants/Constants.constants';

interface KPInformationProps {
    data?: CustomerModel;
    onSubmit: (value: CustomerModel) => void;
    onBack: () => void;
    className?: string;
}

const KPInformation: FC<KPInformationProps> = (props) => {
    const [form] = useForm<CustomerModel>();

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
                            <Select allowClear>
                                <Select.Option key={1}>DUI</Select.Option>
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
                            ]}
                        >
                            <KPInput />
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
