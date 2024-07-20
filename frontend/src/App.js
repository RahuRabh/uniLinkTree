import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage"
import UserLinks from "./components/UserLinks/UserLinks"
import LinkUrl from "./components/LinkUrl/LinkUrl";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/userlinks" element={<UserLinks />}/>
        <Route path="/links/:userId" element={<LinkUrl />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
