import { Navigate } from 'react-router-dom';

import Layout from '@layout/Layout';

import Home from '@pages/Home';
import Cart from '@pages/Cart';

const RoutesList = [
    { path: '/kplace/home', element: <Home />, title: 'Inicio' },
    { path: '/kplace/cart', element: <Cart />, title: 'Carrito' },
];

const Routes = [
    { path: '*', element: <Navigate to="/kplace/home" replace /> },
    {
        path: '/kplace',
        element: <Layout />,
        children: RoutesList,
    },
];

export { Routes, RoutesList };
