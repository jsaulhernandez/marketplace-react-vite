import { Pagination } from '@hooks/useAxios/Response.use-axios';

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
    priceRange?: string; //precios de busqueda
    method?: string; //metodo de pago
}

export interface FilterAction {
    type: FilterActionType;
    payload?: {
        products?: ProductModel[];
        page?: Pagination;
        filters?: FiltersModel;
        search?: string; //buscador del header
    };
}
