import { ProductModel } from '@interfaces/Product.model';

export enum FilterActionType {
    INIT = 'INIT',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    CLEAN = 'CLEAN',
    UPDATE_FILTERS = 'UPDATE_FILTERS',
    UPDATE_DATA = 'UPDATE_DATA',
}

export interface FiltersModel {
    category?: string; //categoría de busqueda
    startPrice?: string; //precio inicial de busqueda
    endPrice?: string; //precio final de busqueda
    method?: string; //metodo de pago
    search?: string; //buscador del header
}

export interface FilterAction {
    type: FilterActionType;
    payload: {
        products?: ProductModel[];
        history?: string[];
        filters?: FiltersModel;
    };
}
