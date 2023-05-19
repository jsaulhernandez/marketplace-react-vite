import Layout from '@layout/Layout';
import Home from '@pages/Home';
import { Navigate } from 'react-router-dom';

const children = [{ path: '/bitplace/home', element: <Home /> }];

export const Routes = [
    { path: '*', element: <Navigate to="/bitplace/home" replace /> },
    {
        path: '/bitplace',
        element: <Layout />,
        children: children,
    },
];
