import { Theme } from "@radix-ui/themes";
import ToasterProvider from "./components/ToasterProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import { routes } from "./pages/routes";
import SettingsPage from "./pages/SettingsPage";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               <Route index element={<HomePage />} />
               <Route path={routes.signup} element={<SignupPage />} />
               <Route path={routes.login} element={<LoginPage />} />
               <Route path={routes.settings} element={<SettingsPage />} />
               <Route path="*" element={<>404</>} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

function App() {
   return (
      <>
         <Theme appearance="dark" accentColor="green">
            <Provider store={store}>
               <Router />
               <ToasterProvider />
            </Provider>
         </Theme>
      </>
   );
}

export default App;
