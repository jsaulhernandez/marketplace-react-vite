import { Content } from './Response.use-axios';

type actions = 'INIT' | 'SUCCESS' | 'ERROR';

export interface ActionReducer<M extends Object> {
    type: actions;
    payload?: {
        message?: string;
        data?: Content<M> | null;
    };
}
