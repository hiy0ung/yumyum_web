import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollPathTop() {
    const { pathname } = useLocation(); // 현재 라우트 경로를 가져옴

    useEffect(() => {
        // 라우트가 바뀔 때마다 실행
        window.scrollTo(0, 0);
    }, [pathname]); // pathname이 바뀔 때마다 스크롤을 맨 위로

    return null;
}

export default ScrollPathTop;
