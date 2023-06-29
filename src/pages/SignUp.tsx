import styled from 'styled-components';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Popover, Steps, StepsProps } from 'antd';

import KPInformative from '@components/login/KPInformative';
import KPInformation from '@components/signup/KPInformation';
import KPCreateAccount from '@components/signup/KPCreateAccount';

import { useResize } from '@hooks/useResize.hook';

import { CustomerModel } from '@interfaces/Customer.model';
import { UserModel } from '@interfaces/User.model';

import { StepStatus } from '@constants/Constants.constants';

const SignUp = () => {
    const [is768] = useResize(768);
    const navigate = useNavigate();

    //steps
    const [step, setStep] = useState<number>(0);
    const [stateCustomer, setCustomer] = useState<CustomerModel>();

    const getStatus = (status: StepStatus) => {
        switch (status) {
            case 'finish':
                return 'finalizado';

            case 'process':
                return 'en proceso';

            case 'wait':
                return 'en espera';

            default:
                return 'error';
        }
    };

    const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
        <Popover content={<span>Estado: {getStatus(status)}</span>}>{dot}</Popover>
    );

    const onBack = () => {
        navigate('/kplace/home');
    };

    const onSetCustomerInformation = (customer: CustomerModel, step: number) => {
        setCustomer(customer);
        setStep(step);
    };

    const onSignUp = (values: UserModel) => {
        console.log('register', values);
    };

    return (
        <Wrapper className="SignUp flex justify-center items-center">
            {!is768 && (
                <KPInformative
                    className="SignUp_item"
                    firstText="Registrate y conoce un mundo diferente al habitual"
                    secondText="Descubre lo mejor de ti, con lo último en tecnología, tenemos lo mejor de lo mejor para tí y tus seres queridos"
                />
            )}

            <div className="SignUp_item flex flex-column items-center">
                <img src="/images/logo/logo.webp" className="mb-2" alt="logo" />

                <Steps
                    current={step}
                    progressDot={customDot}
                    items={[
                        {
                            title: 'Información personal',
                        },
                        {
                            title: 'Crear cuenta',
                        },
                        // {
                        //     title: 'Confirmar correo',
                        // },
                    ]}
                />

                {step === 0 && (
                    <KPInformation
                        data={stateCustomer}
                        onBack={onBack}
                        onSubmit={(value) => onSetCustomerInformation(value, 1)}
                        className="SignUp_form"
                    />
                )}

                {step === 1 && (
                    <KPCreateAccount
                        data={stateCustomer}
                        onBack={() => setStep(0)}
                        onSubmit={(value) => onSignUp(value)}
                        className="SignUp_form"
                    />
                )}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-width: 100vw;
    min-height: 100vh;

    .SignUp_item {
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

    @media screen and (max-width: 1024px) {
        .SignUp_item {
            width: 50%;

            &:not(:last-child) {
                width: 50%;
            }
        }

        .SignUp_form {
            width: 80%;
        }
    }

    @media screen and (max-width: 900px) {
        .SignUp_form {
            width: 100%;
        }
    }

    @media screen and (max-width: 768px) {
        .SignUp_item {
            width: 70% !important;
        }
    }

    @media screen and (max-width: 550px) {
        .SignUp_item {
            width: 80% !important;
        }
    }

    @media screen and (max-width: 450px) {
        .SignUp_item {
            width: 100% !important;
        }
    }
`;

export default SignUp;
