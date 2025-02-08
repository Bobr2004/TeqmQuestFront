import { Theme } from '@radix-ui/themes';
import ToasterProvider from './components/ToasterProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <>
      <Theme>
        <Provider store={store}>
          <Router />
          <ToasterProvider />
        </Provider>
      </Theme>
    </>
  );
}

export default App;
