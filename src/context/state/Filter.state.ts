import { FiltersModel } from '@context/action/Filter.action';

import { ProductModel } from '@interfaces/Product.model';

export interface StateFilterModel {
    products?: ProductModel[];
    history?: string[];
    filters?: FiltersModel;
    search?: string;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
}
