/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
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
    AUTH_PATH_LOGIN,
    MY_PAGE,
    MY_PAGE_UPDATE,
    MAIN_PATH,
    UPDATE_STORE_PATH,
    HOME_PATH,
    FIND_ID_PATH,
    FIND_PW_PATH
} from "./constants";
import Header from "./layouts/Header/index";
import SideBar from "./layouts/SideBar";
import Store from "./views/StoreManagement/GetStore/GetStore";
import CreateStore from "./views/StoreManagement/CreateStore/CreateStore";
import UpdateStore from "./views/StoreManagement/UpdateStore/UpdateStore";
import MenuManagement from "./views/MenuManagement/MenuManagement";
import MenusStats from "./views/Stats/Menus/MenusStats";
import PeriodStats from "./views/Stats/Period/PeriodStats";
import TimeStats from "./views/Stats/Time/TimeStats";
import Contact from "./views/Contact/Contact";
import * as css from "./Styles/MainStyle";
import Order from "./views/Order/Order";
import SignUp from "./views/Authentication/SignUp/SignUp";
import AuthUser from "./views/Authentication/Login/Login";
import Mypage from "./views/MyPage/Mypage";
import MypageUpdate from "./views/MyPage/MypageUpdate";
import Review from "./views/Review/Review";
import Main from "./views/Main/Main";
import { useCookies } from "react-cookie";
import FindId from "./views/Authentication/FIndID/FindID";
import FindPW from "./views/Authentication/FindPW/FindPW";
import ChangePassword from "./views/Authentication/PasswordReset/ChangePassword";
import HaveFound from "./views/Authentication/HaveFound/HaveFound";

function App() {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const navigate = useNavigate();

    useEffect(() => {
        if (!token && !window.location.pathname.includes('/findPassword') &&
            !window.location.pathname.includes('/findId')
        ) {
            navigate(MAIN_PATH);
        }
    }, [token]);

    return (
        <>
            {
                token ?
                    (
                        <div css={css.wrap}>
                            <SideBar />
                            <div css={css.rightContainer}>
                                <Header />
                                <main>
                                    <Routes>
                                        <Route path={HOME_PATH} element={<Order />} />
                                        <Route path={STORE_PATH} element={<Store />} />
                                        <Route path={CREATE_STORE_PATH} element={<CreateStore />} />
                                        <Route path={UPDATE_STORE_PATH} element={<UpdateStore />} />
                                        <Route path={MENU_PATH} element={<MenuManagement />} />
                                        <Route path={STATS_PERIOD_PATH} element={<PeriodStats />} />
                                        <Route path={STATS_MENUS_PATH} element={<MenusStats />} />
                                        <Route path={STATS_TIME_PATH} element={<TimeStats />} />
                                        <Route path={REVIEW_PATH} element={<Review />} />
                                        <Route path={MY_PAGE} element={<Mypage />} />
                                        <Route path={MY_PAGE_UPDATE} element={<MypageUpdate />} />
                                        <Route path={CONTACT_PATH} element={<Contact />} />
                                    </Routes>
                                </main>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Routes>
                                <Route path={MAIN_PATH} element={<Main />} />
                                <Route path={AUTH_PATH_SIGN_UP} element={<SignUp />} />
                                <Route path={FIND_ID_PATH} element={<FindId />} />
                                <Route path={FIND_PW_PATH} element={<FindPW />} />
                                <Route path={AUTH_PATH_LOGIN} element={<AuthUser />} />
                                <Route path="/findPassword" element={<ChangePassword />} />
                                <Route path="/findId" element={<HaveFound />} />
                            </Routes>
                        </div>
                    )
            }
        </>
    );
}

export default App;
