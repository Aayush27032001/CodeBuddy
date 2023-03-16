import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AttemptTest from "./Pages/AttemptTest";
import CreateTest from "./Pages/CreateTest";
import CreatorLogin from "./Pages/CreatorLogin";
import LandingPage from "./Pages/LandingPage";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="/code" element={<AttemptTest />} />
        <Route path="/login" element={<CreatorLogin />} />
        <Route path="/createTest" element={<CreateTest />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
