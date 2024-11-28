/** @jsxImportSource @emotion/react */
import * as React from "react";
import {Link} from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RateReviewIcon from "@mui/icons-material/RateReview";
import * as css from "./Style";
import {REVIEW_PATH, STATS_MENUS_PATH,} from "../../constants";
import a from "../../img/img.png"


export default function SideBar() {

    return (
        <aside css={css.categoryContainer}>
            <nav>
                <ul>
                    <li><Link to={""}><StorefrontIcon/><span>가게</span></Link></li>
                    <li><Link to={""}><MenuBookIcon/><span>메뉴</span></Link></li>
                    <li><Link to={STATS_MENUS_PATH}><QueryStatsIcon/><span>통계</span></Link></li>
                    <li><Link to={REVIEW_PATH}><RateReviewIcon/><span>리뷰</span></Link></li>
                </ul>
            </nav>
            <Link css={css.profile} to={""}><img src={a} alt="프로필 사진"/></Link>
        </aside>
    );
}
