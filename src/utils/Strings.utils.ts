export const convertStringToMoney = (value?: string): string => {
    if (!value) return '';
    return `$${value.split(',')[0]} - $${value.split(',')[1]}`;
};
