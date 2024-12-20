import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function useAccessTokenValid () {
    const location = useLocation();

    useEffect(() => {
        valid();

    },[lacation.pathname]);


}