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
                products: action.payload.products || state.products,
                history: action.payload.history || state.history,
                filters: action.payload.filters || state.filters,
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
                filters: undefined,
                history: undefined,
                products: undefined,
                isLoading: undefined,
                isSuccess: undefined,
                isError: undefined,
            };

        case FilterActionType.UPDATE_DATA:
            return { ...state, products: action.payload.products || state.products };

        case FilterActionType.UPDATE_FILTERS:
            return {
                ...state,
                history: action.payload.history || state.history,
                filters: action.payload.filters || state.filters,
            };

        default:
            return state;
    }
};
