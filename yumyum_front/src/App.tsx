/** @jsxImportSource @emotion/react */
import React, {useEffect} from "react";
import "./App.css";
import {Route, Routes, useLocation} from "react-router-dom";
import {
    AUTH_PATH_SIGN_UP,
    CONTACT_PATH,
    MENU_PATH,
    REVIEW_PATH,
    STATS_MENUS_PATH,
    STATS_PERIOD_PATH,
    STATS_TIME_PATH,
    STORE_PATH,
    CREATE_STORE_PATH,
    AUTH_PATH_LOGIN, MY_PAGE, MY_PAGE_UPDATE, MAIN_PATH,
    UPDATE_STORE_PATH
} from "./constants";
import Header from "./layouts/Header/index";
import SideBar from "./layouts/SideBar";
import Store from "./views/StoreManagement/GetStore/GetStore";
import CreateStore from "./views/StoreManagement/CreateStore/CreateStore"
import UpdateStore from "./views/StoreManagement/UpdateStore/UpdateStore"
import MenuManagement from "./views/MenuManagement/MenuManagement";
import MenusStats from "./views/Stats/Menus/MenusStats";
import PeriodStats from "./views/Stats/Period/PeriodStats";
import TimeStats from "./views/Stats/Time/TimeStats";
import ReviewComment from "./views/Review/ReviewComment";
import Contact from "./views/Contact/Contact";
import * as css from "./Styles/MainStyle";
import Main from "./views/Main/Main";
import SignUp from "./views/Authentication/SignUp/SignUp";
import LogIn from "./views/Authentication/LogIn/LogIn";
import Mypage from "./views/MyPage/Mypage";
import MypageUpdate from "./views/MyPage/MypageUpdate";


function App() {
    return (
        <>
            <div css={css.wrap}>
                <SideBar/>
                <div css={css.rightContainer}>
                    <Header/>
                    <main>
                        <Routes>
                            <Route path={MAIN_PATH} element={<Main/>}/>
                            <Route path={STORE_PATH} element={<Store/>}></Route>
                            <Route path={CREATE_STORE_PATH} element={<CreateStore/>}/>
                            <Route path={UPDATE_STORE_PATH} element={<UpdateStore />}></Route>
                            <Route path={MENU_PATH} element={<MenuManagement/>}></Route>
                            <Route path={STATS_PERIOD_PATH} element={<PeriodStats/>}></Route>
                            <Route path={STATS_MENUS_PATH} element={<MenusStats/>}></Route>
                            <Route path={STATS_TIME_PATH} element={<TimeStats/>}></Route>
                            <Route path={REVIEW_PATH} element={<ReviewComment/>}></Route>
                            <Route path={MY_PAGE} element={<Mypage/>}></Route>
                            <Route path={MY_PAGE_UPDATE} element={<MypageUpdate/>}></Route>
                            <Route path={CONTACT_PATH} element={<Contact/>}></Route>
                            <Route path={AUTH_PATH_SIGN_UP} element={<SignUp/>}></Route>
                            <Route path={AUTH_PATH_LOGIN} element={<LogIn/>}></Route>
                        </Routes>
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;