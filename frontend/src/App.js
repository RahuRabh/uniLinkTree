import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage"
import UserLinks from "./components/UserLinks/UserLinks"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/userlinks" element={<UserLinks />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
