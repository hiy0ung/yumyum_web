import {useCallback} from 'react';

const UseScrollToTop = () => {

    return useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, []);
};

export default UseScrollToTop;