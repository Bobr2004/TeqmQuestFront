import { useAppSelector } from '../store/store';

const LoginPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return <div>LoginPage, current user is {`${user}`}</div>;
};

export default LoginPage;
