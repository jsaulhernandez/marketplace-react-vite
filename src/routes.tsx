import { Navigate } from 'react-router-dom';

import Layout from '@layout/Layout';

import Home from '@pages/Home';
import Cart from '@pages/Cart';
import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';

const PrivateRoutes = [{ path: '/kplace/cart', element: <Cart />, title: 'Carrito' }];

const RoutesList = [{ path: '/kplace/home', element: <Home />, title: 'Inicio' }];

const Routes = [
    { path: '*', element: <Navigate to="/kplace/home" replace /> },
    {
        path: '/kplace',
        element: <Layout />,
        children: RoutesList,
    },
    { path: '/auth/login', element: <LogIn />, title: 'Inicio de sesión' },
    { path: '/auth/signup', element: <SignUp />, title: 'Registrarse en KPlace' },
];

export { Routes, RoutesList, PrivateRoutes };
