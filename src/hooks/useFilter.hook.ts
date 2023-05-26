import { useContext } from 'react';

import useAxios from './useAxios.hook';

import { FilterContext } from '@context/FilterContext.context';
import { FilterActionType } from '@context/action/Filter.action';
import { FiltersModel } from '@context/action/Filter.action';

import { ProductModel } from '@interfaces/Product.model';

export const useFilter = () => {
    const { state, dispatch } = useContext(FilterContext);
    const [_, fetch] = useAxios<ProductModel[]>();

    const onInit = () => {
        dispatch({ type: FilterActionType.INIT });
    };

    const onSuccess = (
        products?: ProductModel[],
        history?: string[],
        filters?: FiltersModel,
        search?: string,
    ) => {
        dispatch({
            type: FilterActionType.SUCCESS,
            payload: { filters, history, products, search },
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

        const response = await fetch('');

        if (response.isSuccess) {
            onSuccess(
                response.data ?? undefined,
                Object.values(filters ?? {}),
                filters,
                search,
            );
        } else {
            onError();
        }
    };

    return {
        ...state,
        methods: { getProducts, onUpdateFilters, onClean },
    };
};
