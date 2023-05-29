import { Dispatch, FC, ReactNode, createContext, useReducer } from 'react';

import { StateFilterModel } from './state/Filter.state';
import { FilterAction } from './action/Filter.action';

import { filterReducer } from '@reducers/FilterReducer.reducer';

const initialState: StateFilterModel = {
    filters: undefined,
    products: undefined,
    page: undefined,
    isLoading: undefined,
    isSuccess: undefined,
    isError: undefined,
};

interface FilterContextModel {
    state: StateFilterModel;
    dispatch: Dispatch<FilterAction>;
}

export const FilterContext = createContext<FilterContextModel>({
    dispatch: (value: FilterAction) => {},
    state: initialState,
});

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: FC<FilterProviderProps> = (props) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {props.children}
        </FilterContext.Provider>
    );
};
