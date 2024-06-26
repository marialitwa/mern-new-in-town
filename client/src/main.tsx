// import React from "react";
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
import Layout from "./components/Layout/Layout.tsx";
import DoctorDetailsPage from "./pages/DoctorDetailsPage.tsx";
import FoodDrinksPage from "./pages/FoodDrinksPage.tsx";
import FormPage from "./pages/FormPage.tsx";
import SportsYogaPage from "./pages/SportsYogaPage.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <Layout>
          <Outlet />
          <Toaster position="top-right" />
        </Layout>
      </AuthContextProvider>
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
        path: "/beauty-wellness",
        element: <BeautyWellnessPage />,
      },
      {
        path: "/sports-yoga",
        element: <SportsYogaPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // NOTE Deactivated React Strict mode because alert in fetchAllDoctors() in DoctorsPage is rendering twice.
  // Same result with toastify message
  // <React.StrictMode>
  // {/* // // <App /> */}
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
  // </React.StrictMode>
);
