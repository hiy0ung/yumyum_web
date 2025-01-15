import {useCallback} from 'react';

const UseScrollTop = () => {

    return useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, []);
};

export default UseScrollTop;