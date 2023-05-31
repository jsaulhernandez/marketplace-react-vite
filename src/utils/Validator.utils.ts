import { OnlyNumberWithDecimalsRegEx } from './RegEx.utils';

export const validateNumbersWithDecimals = async (value: string) => {
    if (value.trim() !== '') {
        if (!OnlyNumberWithDecimalsRegEx.test(value)) {
            throw new Error('Solo se aceptán números');
        }
    }
};
