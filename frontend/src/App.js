import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../src/components/Loader/Loader";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./utils/ProtectedRoutes";
const HomePage = lazy(() => import("./pages/HomePage"));
const LinkUrl = lazy(() => import("./components/LinkUrl/LinkUrl"));
const UserLinks = lazy(() => import("./components/UserLinks/UserLinks"));


function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: false,
        v7_relativeSplatPath: false,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/userlinks"
            element={
              <ProtectedRoute>
                <UserLinks />
              </ProtectedRoute>
            }
          />
          <Route path="/links/:userId" element={<LinkUrl />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
