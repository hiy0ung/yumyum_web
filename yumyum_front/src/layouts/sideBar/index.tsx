/** @jsxImportSource @emotion/react */
import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import InsightsIcon from '@mui/icons-material/Insights';
import HomeIcon from '@mui/icons-material/Home';
import * as css from "../SideBar/Style";
import {
    MAIN_PATH,
    MENU_PATH,
    REVIEW_PATH, STATS_MENUS_PATH, STATS_PATH,
    STATS_PERIOD_PATH, STATS_TIME_PATH,
    STORE_PATH,
    USER_MY_PAGE_PATH,
} from "../../constants";
import defaultProfileImg from "../../img/default_Profile_Img.png"

export default function SideBar() {
    const [pathValue, setPathValue] = useState("");
    const location = useLocation();
    const pathHandle = (path: any) => {
        switch (true) {
            case path === MAIN_PATH:
                setPathValue(MAIN_PATH);
                break;
            case path === STORE_PATH:
                setPathValue(STORE_PATH);
                break;
            case path === MENU_PATH:
                setPathValue(MENU_PATH);
                break;
            case path.startsWith(STATS_PERIOD_PATH):
                setPathValue(STATS_PERIOD_PATH);
                break;
            case path.startsWith(STATS_MENUS_PATH):
                setPathValue(STATS_MENUS_PATH);
                break;
            case path.startsWith(STATS_TIME_PATH):
                setPathValue(STATS_TIME_PATH);
                break;
            case path.startsWith(STATS_PATH):
                setPathValue(STATS_PATH);
                break;
            case path === REVIEW_PATH:
                setPathValue(REVIEW_PATH);
                break;
            default:
                setPathValue("");
        }
    }
    useEffect(() => {
        pathHandle(location.pathname);
    }, [location.pathname]);


    return (

        <aside css={css.categoryContainer}>
            <nav>
                <ul>
                    <li
                        css={pathValue === MAIN_PATH && css.categoriesStyle}
                    ><Link onClick={() => {
                        pathHandle(MAIN_PATH)
                    }} to={MAIN_PATH}>
                        <HomeIcon/><span>홈</span>
                    </Link>
                    </li>
                    <li
                        css={pathValue === STORE_PATH && css.categoriesStyle}
                    ><Link onClick={() => {
                        pathHandle(STORE_PATH)
                    }} to={STORE_PATH}>
                        <StorefrontIcon/><span>가게</span>
                    </Link>
                    </li>
                    <li
                        css={pathValue === MENU_PATH && css.categoriesStyle}
                    ><Link onClick={() => {
                        pathHandle(MENU_PATH)
                    }} to={MENU_PATH}>
                        <MenuBookIcon/><span>메뉴</span>
                    </Link>
                    </li>
                    <li
                        css={pathValue.startsWith(STATS_PATH) && css.categoriesStyle}
                    ><Link onClick={() => {
                        pathHandle(STATS_PERIOD_PATH)
                    }} to={STATS_PERIOD_PATH}>
                        <QueryStatsIcon/><span>통계</span>
                    </Link>
                        <ul css={pathValue.startsWith(STATS_PATH)
                            ? css.categoriesChildGroupOnStyle
                            : css.categoriesChildGroupOffStyle}>
                            <li
                                css={pathValue === STATS_PERIOD_PATH && css.categoriesChildStyle}
                            ><Link onClick={() => {
                                pathHandle(STATS_PERIOD_PATH)
                            }} to={STATS_PERIOD_PATH}>
                                <CalendarMonthIcon/><span>기간별 통계</span>
                            </Link>
                            </li>
                            <li
                                css={pathValue === STATS_MENUS_PATH && css.categoriesChildStyle}
                            ><Link onClick={() => {
                                pathHandle(STATS_MENUS_PATH)
                            }} to={STATS_MENUS_PATH}>
                                <DonutSmallIcon/><span>메뉴별 통계</span>
                            </Link>
                            </li>
                            <li
                                css={pathValue === STATS_TIME_PATH && css.categoriesChildStyle}
                            ><Link onClick={() => {
                                pathHandle(STATS_TIME_PATH)
                            }} to={STATS_TIME_PATH}>
                                <InsightsIcon/><span>시간별 통계</span>
                            </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        css={pathValue === REVIEW_PATH && css.categoriesStyle}
                    ><Link onClick={() => {
                        pathHandle(REVIEW_PATH)
                    }} to={REVIEW_PATH}>
                        <RateReviewIcon/><span>리뷰</span>
                    </Link>
                    </li>
                </ul>
            </nav>
            <Link css={css.profile} to={USER_MY_PAGE_PATH}><img src={defaultProfileImg} alt="프로필 사진"/></Link>
        </aside>
    );
}