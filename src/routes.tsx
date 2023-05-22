import Layout from '@layout/Layout';
import Home from '@pages/Home';
import { Navigate } from 'react-router-dom';

const children = [{ path: '/kplace/home', element: <Home /> }];

export const Routes = [
    { path: '*', element: <Navigate to="/kplace/home" replace /> },
    {
        path: '/kplace',
        element: <Layout />,
        children: children,
    },
];
