import { Navigate } from 'react-router-dom';

import Layout from '@layout/Layout';

import Home from '@pages/Home';

const RoutesList = [{ path: '/kplace/home', element: <Home />, title: 'Inicio' }];

const Routes = [
    { path: '*', element: <Navigate to="/kplace/home" replace /> },
    {
        path: '/kplace',
        element: <Layout />,
        children: RoutesList,
    },
];

export { Routes, RoutesList };
