import { FC } from 'react';

import { Form } from 'antd';
import styled from 'styled-components';
import { useForm } from 'antd/es/form/Form';
import { LeftOutlined } from '@ant-design/icons';

import KPButton from '@components/KPButton';
import KPInput from '@components/KPInput';
import KPText from '@components/KPText';

import useAxios from '@hooks/useAxios.hook';

import { CustomerModel } from '@interfaces/Customer.model';
import { UserModel } from '@interfaces/User.model';

import { validateEmail } from '@utils/Validator.utils';

import { errorMessage } from '@constants/Constants.constants';

interface KPCreateAccountProps {
    data?: CustomerModel;
    onSubmit: (value: UserModel) => void;
    onBack: () => void;
    className?: string;
}

const KPCreateAccount: FC<KPCreateAccountProps> = (props) => {
    const [, fetchExistsEmail] = useAxios<boolean>();

    const [form] = useForm<UserModel>();

    const onFinish = (values: UserModel) => {
        props.onSubmit({
            ...values,
            customer: props.data,
        });
    };

    const existsEmailAddress = async (value: string) => {
        try {
            await validateEmail(value);
            const response = await fetchExistsEmail({
                method: 'GET',
                path: '/customer/web/exists-email',
                queries: {
                    email: value,
                },
            });

            if (response.isSuccess && response.data)
                return Promise.reject(
                    'El correo electrónico ya se encuentra registrado.',
                );
        } catch (error) {
            console.log('[ERROR]', error);
        }
    };

    return (
        <Wrapper className="KPCreateAccount flex flex-column wp-100 mt-5">
            <KPText
                text={
                    <span>
                        Para continuar con tú registro&nbsp;
                        <strong>
                            {props.data?.firstName + ' ' + props.data?.firstLastName}
                        </strong>
                        &nbsp;debes ingresar un correo y una contraseña, para crear tu
                        información de inicio de sesión
                    </span>
                }
                marginBottom={20}
                type="div"
            />
            <Form
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                className={`KPCreateAccount_form ${
                    props.className ? props.className : ''
                }`}
            >
                <div className="kp-row">
                    <div className="kp-column-50">
                        <label htmlFor="email">
                            Correo electr&oacute;nico<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: errorMessage,
                                },
                                {
                                    validator: (_, value) => validateEmail(value),
                                },
                                {
                                    validator: (_, value) => existsEmailAddress(value),
                                },
                            ]}
                        >
                            <KPInput />
                        </Form.Item>
                    </div>

                    <div className="kp-column-50">
                        <label htmlFor="password">
                            Contrase&ntilde;a<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="password"
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
                <div className="flex justify-center items-center g-20">
                    <KPButton
                        type="secondary"
                        onClick={props.onBack}
                        prefix={<LeftOutlined />}
                    >
                        Atras
                    </KPButton>
                    <KPButton type="primary" htmlType="submit">
                        Registrarse
                    </KPButton>
                </div>
            </Form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    @media screen and (max-width: 1024px) {
        align-items: center;

        .KPCreateAccount_form .kp-row {
            flex-direction: column;
            gap: 0px;

            .kp-column-50 {
                width: 100%;
            }
        }
    }
`;

export default KPCreateAccount;
