import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AttemptTest from "./Pages/AttemptTest";
import LandingPage from "./Pages/LandingPage";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="/code" element={<AttemptTest />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
