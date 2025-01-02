import React, { useEffect, useRef } from "react";
import useWindowSize from "./useWindowSize";

const SmoothScroll = ({ children }) => {
    const windowSize = useWindowSize();
    const scrollingContainerRef = useRef(null);

    const dataRef = useRef({
        ease: 0.05,
        current: 0,
        previous: 0,
        rounded: 0,
    });

    const setBodyHeight = () => {
        if (scrollingContainerRef.current) {
            const scrollHeight = scrollingContainerRef.current.scrollHeight;
            console.log('Scroll Height:', scrollHeight);
            document.body.style.height = `${scrollHeight}px`;
        }
    };

    const smoothScrollingHandler = () => {
        const data = dataRef.current;

        data.current = window.scrollY;
        data.previous += (data.current - data.previous) * data.ease;
        data.rounded = Math.round(data.previous * 100) / 100;

        if (scrollingContainerRef.current) {
            scrollingContainerRef.current.style.transform = `translateY(-${data.rounded}px)`;
        }

        requestAnimationFrame(smoothScrollingHandler);
    };

    useEffect(() => {
        setBodyHeight(); // 초기 높이 설정
        smoothScrollingHandler(); // 스무스 스크롤링 시작

        window.addEventListener('resize', setBodyHeight); // 리사이즈 시 높이 재설정

        return () => {
            window.removeEventListener('resize', setBodyHeight); // 클린업
        };
    }, [children, windowSize]);

    return (
        <div className="parent">
            <div ref={scrollingContainerRef}>{children}</div>
        </div>
    );
};

export default SmoothScroll;