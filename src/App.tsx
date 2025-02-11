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
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import EditQuestsPage from "./pages/EditQuestsPage/EditQuestsPage";
import EditQuestPage from "./pages/EditQuestPage/EditQuestPage";
import NotFoundPage from "./pages/NotFoundPage";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               <Route index element={<HomePage />} />
               {/* User */}
               <Route path={routes.signup} element={<SignupPage />} />
               <Route path={routes.login} element={<LoginPage />} />
               <Route path={routes.settings} element={<SettingsPage />} />
               {/* Quest creation */}
               <Route path={routes.editQuests} element={<EditQuestsPage />} />
               <Route
                  path={`${routes.editQuests}/:id`}
                  element={<EditQuestPage />}
               />

               {/* Quests */}

               <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

function App() {
   return (
      <>
         <Provider store={store}>
            <Theme appearance="dark" accentColor="green">
               <Router />
               <ToasterProvider />
            </Theme>
         </Provider>
      </>
   );
}

export default App;
