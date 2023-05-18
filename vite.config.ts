import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@root': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components'),
            '@pages': resolve(__dirname, './src/pages'),
            '@helpers': resolve(__dirname, './src/helpers'),
            '@assets': resolve(__dirname, './src/assets'),
            '@context': resolve(__dirname, './src/context'),
            '@hooks': resolve(__dirname, './src/hooks'),
            '@layout': resolve(__dirname, './src/layout'),
            '@interfaces': resolve(__dirname, './src/interfaces'),
            '@utils': resolve(__dirname, './src/utils'),
            '@reducers': resolve(__dirname, './src/reducers'),
        },
    },
    plugins: [react()],
    // css: {
    //     preprocessorOptions: {
    //         less: {
    //             modifyVars: {
    //                 'primary-color': '#d39000',
    //                 'link-color': '#001a70',
    //                 'border-radius-base': '4px',
    //                 'error-color': '#ff859c',
    //             },
    //             javascriptEnabled: true,
    //         },
    //     },
    // },
});
