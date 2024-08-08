import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";

//components
import HomePage from "./pages/HomePage"
import UserLinks from "./components/UserLinks/UserLinks"
import LinkUrl from "./components/LinkUrl/LinkUrl";

//protected routes
import ProtectRoutes from "./components/ProtectedRoutes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userlinks" element={<ProtectRoutes Component={UserLinks} />}/>
        <Route path="/links/:userId" element={<LinkUrl />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
