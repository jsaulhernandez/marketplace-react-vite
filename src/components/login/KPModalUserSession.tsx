import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { Modal } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import KPText from '@components/KPText';
import KPButton from '@components/KPButton';

interface KPModalUserSessionProps {
    open: boolean;
    onClose: (value: boolean) => void;
}

const KPModalUserSession: FC<KPModalUserSessionProps> = (props) => {
    const navigate = useNavigate();

    const onGoToLogInOrSignUp = (action: 'logIn' | 'signUp') => {
        if (action === 'logIn') navigate('/auth/login');
        if (action === 'signUp') navigate('/auth/signup');
    };

    return (
        <Wrapper
            title={<img src="/kplace.svg" width={20} alt="company" />}
            open={props.open}
            onCancel={() => props.onClose(!props.open)}
            footer={null}
        >
            <div className="KPModalUserSession flex flex-column items-center justify-center g-20 mt-2">
                <div className="KPModalUserSession_body flex flex-column items-center justify-center g-20">
                    <FrownOutlined className="KPModalUserSession_body-icon" />

                    <KPText
                        text="Upsss!"
                        fontSize={30}
                        fontWeight={500}
                        textColor="--primary-text-color"
                    />

                    <span className="KPModalUserSession_body-text">
                        Para poder comprar el siguiente producto o agregarlo al carrito
                        debes&nbsp;
                        <strong
                            className="log-in"
                            onClick={() => onGoToLogInOrSignUp('logIn')}
                        >
                            iniciar sesión
                        </strong>
                        , y si no tienes una cuenta puedes&nbsp;
                        <strong
                            className="sign-up"
                            onClick={() => onGoToLogInOrSignUp('signUp')}
                        >
                            registrarte
                        </strong>
                        .
                    </span>
                </div>
                <div className="KPModalUserSession_footer">
                    <KPButton type="link" onClick={() => props.onClose(!props.open)}>
                        Cerrar
                    </KPButton>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled(Modal)`
    .KPModalUserSession_body-icon {
        transform: scale(4);
        color: var(--primary-color);
    }

    .KPModalUserSession_body-text {
        .log-in:hover,
        .sign-up:hover {
            color: var(--primary-color);
            cursor: pointer;
        }
    }
`;

export default KPModalUserSession;
