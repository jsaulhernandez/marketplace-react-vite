import { useContext } from 'react';

import useAxios from './useAxios.hook';

import { FilterContext } from '@context/FilterContext.context';
import { FilterActionType } from '@context/action/Filter.action';
import { FiltersModel } from '@context/action/Filter.action';

import { ProductModel } from '@interfaces/Product.model';
import { Pagination } from './useAxios/Response.use-axios';

import { ORDER_BY } from '@constants/Constants.constants';

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

    const getProducts = async (
        filters?: FiltersModel,
        search: string = '',
        order: ORDER_BY = 'DESC',
        page: string = '1',
        size: string = '16',
    ) => {
        onInit();

        const response = await fetch({
            method: 'GET',
            path: '/product/web/list',
            queries: {
                category: filters?.category ?? '0',
                startPrice: filters?.priceRange?.split(',')[0] ?? '0',
                endPrice: filters?.priceRange?.split(',')[1] ?? '0',
                payMethod: filters?.method ?? '0',
                search,
                order,
                page,
                size,
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
