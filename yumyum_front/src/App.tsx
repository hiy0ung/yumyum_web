import React from "react";
import "./App.css";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router-dom";
import SignUp from "./views/Authentication/SignUp/SignUp";
import { Box } from "@mui/material";

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
  );
}

export default App;