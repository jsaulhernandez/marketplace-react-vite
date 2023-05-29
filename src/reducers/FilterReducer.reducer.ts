import { FilterAction, FilterActionType } from '@context/action/Filter.action';
import { StateFilterModel } from '@context/state/Filter.state';

export const filterReducer = (
    state: StateFilterModel,
    action: FilterAction,
): StateFilterModel => {
    switch (action.type) {
        case FilterActionType.INIT:
            return { ...state, isLoading: true, isSuccess: false, isError: false };

        case FilterActionType.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                isError: false,
                products: action.payload?.products || state.products,
                page: action.payload?.page || state.page,
                search: action.payload?.search || state.search,
            };

        case FilterActionType.ERROR:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                isError: true,
            };

        case FilterActionType.CLEAN:
            return {
                search: undefined,
                filters: undefined,
                products: undefined,
                page: undefined,
                isLoading: undefined,
                isSuccess: undefined,
                isError: undefined,
            };

        case FilterActionType.UPDATE_DATA:
            return {
                ...state,
                products: action.payload?.products || state.products,
                page: action.payload?.page || state.page,
            };

        case FilterActionType.UPDATE_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    category:
                        action.payload?.filters?.category || state.filters?.category,
                    priceRange:
                        action.payload?.filters?.priceRange || state.filters?.priceRange,
                    method: action.payload?.filters?.method || state.filters?.method,
                },
            };

        default:
            return state;
    }
};
