import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DoctorsPage from "./pages/DoctorsPage.tsx";
import CafesRestaurantsPage from "./pages/CafesRestaurantsPage.tsx";
import TripsPage from "./pages/TripsPage.tsx";
import CulturalPage from "./pages/CulturalPage.tsx";
import BeautyWellnessPage from "./pages/BeautyWellnessPage.tsx";
import Error404 from "./pages/Error404.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/doctors",
    element: <DoctorsPage />,
  },
  {
    path: "/cafes-restaurants",
    element: <CafesRestaurantsPage />,
  },
  {
    path: "/trips",
    element: <TripsPage />,
  },
  {
    path: "/cultural",
    element: <CulturalPage />,
  },
  {
    path: "beauty-wellness",
    element: <BeautyWellnessPage />,
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
