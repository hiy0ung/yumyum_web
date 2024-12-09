/** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {
    AUTH_PATH_SIGN_UP,
    CONTACT_PATH,
    MENU_PATH,
    REVIEW_PATH,
    STATS_MENUS_PATH,
    STATS_PERIOD_PATH,
    STATS_TIME_PATH,
    STORE_PATH,
    USER_MY_PAGE_PATH
} from "./constants";
import Header from "./layouts/Header/index";
import Footer from "./layouts/Footer";
import SideBar from "./layouts/SideBar";
import StoreManagement from "./views/StoreManagement/StoreManagement";
import MenuManagement from "./views/MenuManagement/MenuManagement";
import MenusStats from "./views/Stats/Menus/MenusStats";
import PeriodStats from "./views/Stats/Period/PeriodStats";
import TimeStats from "./views/Stats/Time/TimeStats";
import Review from "./views/Review/Review";
import UserMyPage from "./views/UserMyPage/UserMyPage";
import Contact from "./views/Contact/Contact";
import * as css from "./Styles/MainStyle";
import Main from "./views/Main/Main";
import SignUp from "./views/Authentication/SignUp/SignUp";


function App() {
    return (
        <>
            <Header/>
            <div css={css.middleContainer}>
                <div css={css.middleLeftContainer}>
                    <SideBar/>
                </div>
                <main css={css.middleRightContainer}>
                    <Routes>
                        <Route path={"/"} element={<Main/>}/>
                        <Route path={STORE_PATH} element={<StoreManagement/>}/>
                        <Route path={MENU_PATH} element={<MenuManagement />}></Route>
                        <Route path={STATS_PERIOD_PATH} element={<PeriodStats/>}></Route>
                        <Route path={STATS_MENUS_PATH} element={<MenusStats/>}></Route>
                        <Route path={STATS_TIME_PATH} element={<TimeStats/>}></Route>
                        <Route path={REVIEW_PATH} element={<Review/>}></Route>
                        <Route path={USER_MY_PAGE_PATH} element={<UserMyPage />}></Route>
                        <Route path={CONTACT_PATH} element={<Contact/>}></Route>
                        <Route path={AUTH_PATH_SIGN_UP} element={<SignUp/>}></Route>
                    </Routes>
                </main>
            </div>
            <Footer/>
        </>
    );
}
export default App;