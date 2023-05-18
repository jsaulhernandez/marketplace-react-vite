type methods = 'POST' | 'UPDATE' | 'DELETE' | 'GET';

export interface OptionRequest<M extends Object> {
    method: methods;
    path: string;
    data?: M;
    queries?: Record<string, string>;
}
