import { useEffect, useState } from 'react';

const useScrollElementsAnimation = (ref: React.RefObject<HTMLElement>, viewPoint: number) => {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        if (!ref.current) return;
        const locationInfo = ref.current.getBoundingClientRect();
        const isVisible = locationInfo.top <= window.innerHeight * viewPoint && locationInfo.bottom >= 0;
        setVisible(isVisible);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [viewPoint,ref]);

    return visible;
};
export default useScrollElementsAnimation;
