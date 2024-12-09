/** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {AUTH_PATH_SIGN_UP, REVIEW_PATH, STATS_MENUS_PATH} from "./constants";
import Review from "./views/Review/Review";
import MenusStats from "./views/Stats/MenusStats";
import SignUp from "./views/Authentication/SignUp/SignUp";
import Header from "./layouts/Header/index";
import Footer from "./layouts/Footer";
import SideBar from "./layouts/sideBar/index"
import * as css from "./Styles/MainStyle";

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
                        <Route path={AUTH_PATH_SIGN_UP} element={<SignUp/>}></Route>
                        <Route path={REVIEW_PATH} element={<Review/>}></Route>
                        <Route path={STATS_MENUS_PATH} element={<MenusStats/>}></Route>
                    </Routes>
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default App;
