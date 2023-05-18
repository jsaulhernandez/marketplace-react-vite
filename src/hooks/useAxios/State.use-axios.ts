import { Pagination } from './Response.use-axios';

export interface StateResponse<M extends Object> {
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    message: string;
    data: M | null;
    page: Pagination | null;
}
