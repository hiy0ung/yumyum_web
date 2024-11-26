import React from "react";
import "./App.css";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router-dom";
import SignUp from "./views/Authentication/SignUp/SignUp";
import { Box } from "@mui/material";
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AUTH_PATH_SIGN_UP, REVIEW_PATH, STATS_MENU } from "./constants";
import Review from "./views/Review/Review";
import MenusStats from "./views/Stats/MenusStats";
import SignUp from "./views/Authentication/SignUp/SignUp";
import Header from "./layouts/Header/index";
import Footer from "./layouts/Footer";
import SideBar from "./layouts/sideBar"

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1, mt: "64px" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
    <div className="App">
      <Header />
      <SideBar/>
      <Routes>
        <Route path={AUTH_PATH_SIGN_UP} element={<SignUp />}></Route>
        <Route path={REVIEW_PATH} element={<Review />}></Route>
        <Route path={STATS_MENU} element={<MenusStats />}></Route>
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;