import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import es_ES from 'antd/es/locale/es_ES';
//import 'antd/dist/antd.less';

import moment from 'moment';
import 'moment/dist/locale/es';

import App from './App.tsx';
import './style.css';
import { FilterProvider } from '@context/FilterContext.context.tsx';

moment.locale('es');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider locale={es_ES}>
                <FilterProvider>
                    <App />
                </FilterProvider>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
