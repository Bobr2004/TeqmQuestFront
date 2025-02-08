import { Theme } from "@radix-ui/themes";
import ToasterProvider from "./components/ToasterProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index path="/" element={<>Nigga</>} />
               <Route path="signup" element={<SignupPage />} />
               <Route path="login" element={<LoginPage />} />
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
