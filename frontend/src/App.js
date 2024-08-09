// import React from "react";
// import { BrowserRouter , Route, Routes } from "react-router-dom";

// //components
// import HomePage from "./pages/HomePage"
// import UserLinks from "./components/UserLinks/UserLinks"
// import LinkUrl from "./components/LinkUrl/LinkUrl";

// //protected routes
// import ProtectRoutes from "./components/ProtectedRoutes"

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/userlinks" element={<ProtectRoutes Component={UserLinks} />}/>
//         <Route path="/links/:userId" element={<LinkUrl />}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../src/components/Loader/Loader"

// Lazy load components
const HomePage = lazy(() => import("./pages/HomePage"));
const UserLinks = lazy(() => import("./components/UserLinks/UserLinks"));
const LinkUrl = lazy(() => import("./components/LinkUrl/LinkUrl"));
const ProtectRoutes = lazy(() => import("./components/ProtectedRoutes"));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div><Loader /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userlinks" element={<ProtectRoutes Component={UserLinks} />} />
          <Route path="/links/:userId" element={<LinkUrl />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
