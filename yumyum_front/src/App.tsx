import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {AUTH_PATH_SIGN_UP, REVIEW_PATH, STATS_MENU} from "./constants";
import Review from "./views/Review/Review";
import MenusStats from "./views/Stats/MenusStats";
import SignUp from "./views/Authentication/SignUp/SignUp";
import Header from "./layouts/Header/index";
import Footer from "./layouts/Footer";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={AUTH_PATH_SIGN_UP} element={<SignUp/>}></Route>
                <Route path={REVIEW_PATH} element={<Review/>}></Route>
                <Route path={STATS_MENU} element={<MenusStats/>}></Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
