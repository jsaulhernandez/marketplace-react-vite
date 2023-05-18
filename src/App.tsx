import useAxios from '@hooks/useAxios.hook';
import './App.css';

import PublicLayout from '@layout/PublicLayout';
import { useEffect } from 'react';

const App = () => {
    const [state, fetch] = useAxios();

    useEffect(() => {
        fetch('/category/web');
    }, []);

    useEffect(() => {
        console.log('state', state);
    }, [state]);

    return <PublicLayout />;
};

export default App;
