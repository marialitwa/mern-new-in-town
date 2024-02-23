import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyles from "./components/GlobalStyles";
import App from "./App.tsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import DoctorsPage from "./pages/DoctorsPage.tsx";
import TripsPage from "./pages/TripsPage.tsx";
import CulturalPage from "./pages/CulturalPage.tsx";
import BeautyWellnessPage from "./pages/BeautyWellnessPage.tsx";
import Error404 from "./pages/Error404.tsx";
import Layout from "./components/Layout.tsx";
import DoctorDetailsPage from "./pages/DoctorDetailsPage.tsx";
import FoodDrinksPage from "./pages/FoodDrinksPage.tsx";
import FormPage from "./pages/FormPage.tsx";
import SportsYogaPage from "./pages/SportsYogaPage.tsx";

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/form",
        element: <FormPage />,
      },
      {
        path: "/doctors",
        element: <DoctorsPage />,
      },
      {
        path: "/doctors/:id",
        element: <DoctorDetailsPage />,
      },
      {
        path: "/foods",
        element: <FoodDrinksPage />,
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
        path: "sports-yoga",
        element: <SportsYogaPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
);
