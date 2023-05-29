import { useContext } from 'react';

import useAxios from './useAxios.hook';

import { FilterContext } from '@context/FilterContext.context';
import { FilterActionType } from '@context/action/Filter.action';
import { FiltersModel } from '@context/action/Filter.action';

import { ProductModel } from '@interfaces/Product.model';
import { Pagination } from './useAxios/Response.use-axios';

export const useFilter = () => {
    const { state, dispatch } = useContext(FilterContext);
    const [_, fetch] = useAxios<ProductModel[]>();

    const onInit = () => {
        dispatch({ type: FilterActionType.INIT });
    };

    const onSuccess = (products?: ProductModel[], page?: Pagination, search?: string) => {
        dispatch({
            type: FilterActionType.SUCCESS,
            payload: { products, page, search },
        });
    };

    const onError = () => {
        dispatch({ type: FilterActionType.ERROR });
    };

    const onClean = () => {
        dispatch({ type: FilterActionType.CLEAN });
    };

    const onUpdateFilters = (filters?: FiltersModel) => {
        dispatch({
            type: FilterActionType.UPDATE_FILTERS,
            payload: {
                filters,
            },
        });
    };

    const getProducts = async (search?: string, filters?: FiltersModel) => {
        onInit();

        const response = await fetch({
            method: 'GET',
            path: '/product/web/list',
            queries: {
                size: '16',
            },
        });

        if (response.isSuccess) {
            onSuccess(response.data ?? undefined, response.page ?? undefined, search);
        } else {
            onError();
        }
    };

    return {
        ...state,
        methods: { getProducts, onUpdateFilters, onClean },
    };
};
