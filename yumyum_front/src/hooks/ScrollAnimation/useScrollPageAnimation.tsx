import {useEffect, useRef} from 'react';


const useScrollPageAnimation = () => {
    const currentScroll = useRef(0);
    const targetScroll = useRef(0);
    const isMoving = useRef(false);
    const maxScroll = useRef(0);

    const smoothScroll = () => {
        const gap = targetScroll.current - currentScroll.current;
        if (Math.abs(gap) > 0.1) {
            currentScroll.current += gap * 0.05;
            window.scrollTo(0, currentScroll.current);
            requestAnimationFrame(smoothScroll);
        } else {
            isMoving.current = false;
        }
    };

    const handleScroll = (e: { preventDefault: () => void; deltaY: number; }) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        targetScroll.current += direction * 60;
        targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll.current));
        if (!isMoving.current) {
            isMoving.current = true;
            smoothScroll();
        }
    };

    const updateMaxScroll = () => {
        const pageHeight = document.documentElement.scrollHeight;
        const viewHeight = window.innerHeight;
        const minHeight = viewHeight * 2;
        maxScroll.current = Math.max(pageHeight - viewHeight, minHeight - viewHeight);
    };

    useEffect(() => {
        updateMaxScroll();
        window.addEventListener('wheel', handleScroll, { passive: false });
        window.addEventListener('resize', updateMaxScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('resize', updateMaxScroll);
        };
    }, []);
};

export default useScrollPageAnimation;