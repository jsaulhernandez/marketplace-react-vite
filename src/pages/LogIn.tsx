import { useNavigate } from 'react-router-dom';

import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import styled from 'styled-components';

import KPButton from '@components/KPButton';
import KPInput from '@components/KPInput';
import KPInformative from '@components/login/KPInformative';

import { useResize } from '@hooks/useResize.hook';

import { LoginModel } from '@interfaces/Login.model';

const LogIn = () => {
    const [is768] = useResize(768);
    const navigate = useNavigate();

    const [form] = useForm<LoginModel>();

    const redirect = (option: 'home' | 'signUp') => {
        if (option === 'home') navigate('/kplace/home');
        if (option === 'signUp') navigate('/auth/signup');
    };

    const onFinish = (values: LoginModel) => {};

    return (
        <Wrapper className="flex justify-center items-center">
            {!is768 && (
                <KPInformative
                    className="LogIn_item"
                    firstText="Inicia a comprar lo mejor de lo mejor con nosotros"
                    secondText="Descubre lo mejor de lo mejor de la tecnología, que te ayudara a sacar lo mejor de ti"
                />
            )}
            <div className="LogIn_item flex flex-column justify-center items-center">
                <img src="/images/logo/logo.webp" alt="logo" />
                <Form
                    form={form}
                    autoComplete="off"
                    className="LogIn_form wp-50 mt-5"
                    onFinish={onFinish}
                >
                    <div className="kp-column">
                        <label htmlFor="email">
                            Correo electr&oacute;nico<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingresa tu correo electrónico',
                                },
                            ]}
                        >
                            <KPInput />
                        </Form.Item>
                    </div>

                    <div className="kp-column">
                        <label htmlFor="password">
                            Contraseña<span>*</span>
                        </label>
                        <Form.Item
                            hasFeedback
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingresa la contraseña asociada a tu correo',
                                },
                            ]}
                        >
                            <KPInput />
                        </Form.Item>
                    </div>

                    <div className="flex flex-column g-20">
                        <KPButton type="primary" htmlType="submit">
                            Iniciar sesión
                        </KPButton>
                        <KPButton
                            type="primary"
                            theme="dark"
                            onClick={() => redirect('home')}
                        >
                            Volver
                        </KPButton>
                    </div>

                    <div className="flex items-center justify-center mt-1">
                        No tienes cuenta?&nbsp;
                        <strong className="sign-up" onClick={() => redirect('signUp')}>
                            Registrarse
                        </strong>
                    </div>
                </Form>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-width: 100vw;
    min-height: 100vh;

    .LogIn_item {
        min-height: 100vh;
        padding: 50px;
        width: 60%;

        img {
            width: 200px;
        }

        &:not(:last-child) {
            width: 40%;
        }
    }

    .sign-up:hover {
        color: var(--primary-color);
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
        .LogIn_item {
            width: 50%;

            &:not(:last-child) {
                width: 50%;
            }
        }

        .LogIn_form {
            width: 80%;
        }
    }

    @media screen and (max-width: 900px) {
        .LogIn_form {
            width: 100%;
        }
    }

    @media screen and (max-width: 768px) {
        .LogIn_item {
            width: 70% !important;
        }
    }

    @media screen and (max-width: 550px) {
        .LogIn_item {
            width: 80% !important;
        }
    }

    @media screen and (max-width: 450px) {
        .LogIn_item {
            width: 100% !important;
        }
    }
`;

export default LogIn;
