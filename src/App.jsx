import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

import { HousesProvider } from "./contexts/HousesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import HouseList from "./components/app/HouseList";
//import CountryList from "./components/app/CountryList";
//import House from "./components/app/House";
//import Form from "./components/app/Form";
import Spinner from "./components/Spinner/Spinner";

// import Homepage from "./pages/Homepage";
// import About from "./pages/About";
// import Pricing from "./pages/Pricing";
// import Analysis from "./pages/Analysis";
// import Contact from "./pages/Contact";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
//optimize the bundle page
//bundle - a javascript file that contains the entire code of the application
//code spliting - to split the bundles into  multiple parts which can be downloaded overtime ,as they become necessary for the app

//split bundle at page level - load each bundle that repensents a page seperately
const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Analysis = lazy(() => import("./pages/Analysis"));
const Contact = lazy(() => import("./pages/Contact"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

//split bundle at component level
const HouseList = lazy(() => import("./components/app/HouseList"));
const House = lazy(() => import("./components/app/HouseList"));
const CountryList = lazy(() => import("./components/app/House"));
const Form = lazy(() => import("./components/app/Form"));

function App() {
  return (
    <AuthProvider>
      <HousesProvider>
        <BrowserRouter>
          {/*suspense api - components are going to be suspended while they are loading  */}
          <Suspense fallback={<Spinner />} />
          {/* map path to components */}
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            {/* nested route for app  */}
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />{" "}
                </ProtectedRoute>
              }
            >
              {/* index route  */}
              <Route index element={<Navigate replace to="houses" />} />
              <Route path="houses" element={<HouseList />} />
              {/* URL Params  */}
              <Route path="houses/:id" element={<House />} />

              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </HousesProvider>
    </AuthProvider>
  );
}

export default App;
