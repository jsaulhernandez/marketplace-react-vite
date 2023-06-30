import { OnlyNumberWithDecimalsRegEx, ValidationEmail } from './RegEx.utils';

export const validateNumbersWithDecimals = async (value: string) => {
    if (value.trim() !== '') {
        if (!OnlyNumberWithDecimalsRegEx.test(value)) {
            throw new Error('Solo se aceptán números');
        }
    }
};

export const validateEmail = async (value: string) => {
    if (value.trim() !== '') {
        if (!ValidationEmail.test(value)) {
            throw new Error('El correo electrónico ingresado es inválido.');
        }
    }
};
