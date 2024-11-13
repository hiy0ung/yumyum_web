import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { REVIEW_PATH, STATS_MENU } from './constants';
import Review from './views/Review/Review';
import MenusStats from './views/Stats/MenusStats';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={REVIEW_PATH} element={<Review />}></Route>
        <Route path={STATS_MENU} element={<MenusStats />}></Route>
      </Routes>
    </div>
  );
}

export default App;
