import { useNavigate, useSearchParams } from 'react-router';
import { useAppDispatch } from '../store/store';
import { setToken, setUser } from '../store/auth/auth.slice';
import { routes } from '../configs/routes';
import { useLazyGetCurrentUserQuery } from '../store/auth/auth.api';
import { useEffect } from 'react';

const AfterOauthPage = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const code = params.get('code');

  useEffect(() => {
    if (!code) return void navigate(routes.login);
    dispatch(setToken(code));
    getCurrentUser()
      .unwrap()
      .then((user) => {
        dispatch(setUser(user));
        navigate(routes.home);
      });
  }, [code]);

  return <></>;
};

export default AfterOauthPage;
