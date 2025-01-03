export const API_URL: string = import.meta.env.VITE_API_URL;

export const PRICES_FILTERS = [
    { label: '$500 - $1,000', value: '500,1000', active: false },
    { label: '$1,000 - $1,500', value: '1000,1500', active: false },
    { label: '$1,500 - $2,000', value: '1500,2000', active: false },
    { label: '$2,000 - $2,500', value: '2000,2500', active: false },
];

export type ORDER_BY = 'ASC' | 'DESC';

export type SHOWING = 'DATA' | 'DETAIL' | 'FORM';

export const tax: number = 13;
export const shippingCost: number = 50;

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type TypeButton = 'primary' | 'secondary' | 'link' | 'danger';
export type StepStatus = 'error' | 'process' | 'finish' | 'wait';

export const errorMessage: string = 'Este campo es obligatorio.';
