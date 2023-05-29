import { FiltersModel } from '@context/action/Filter.action';

import { Pagination } from '@hooks/useAxios/Response.use-axios';

import { ProductModel } from '@interfaces/Product.model';

export interface StateFilterModel {
    products?: ProductModel[];
    page?: Pagination;
    filters?: FiltersModel;
    search?: string;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
}
