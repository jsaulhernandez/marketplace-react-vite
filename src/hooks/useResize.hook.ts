import { useEffect, useState } from 'react';

export const useResize = (minWidth: number) => {
    const [state, setState] = useState({
        windowWidth: window.innerWidth,
        isDesired: false,
    });

    const resizeHandler = () => {
        const windowWidth = window.innerWidth;
        const isDesired = windowWidth <= minWidth;

        setState({ isDesired, windowWidth });
    };

    useEffect(() => {
        resizeHandler();

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [state.windowWidth]);

    return [state.isDesired, state.windowWidth];
};
