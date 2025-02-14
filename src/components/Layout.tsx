import { NavLink, Outlet } from 'react-router';
import { Button } from '@radix-ui/themes';
import { useAppDispatch, useAppSelector } from '../store/store';
import UserAvatar from './UserAvatar';
import { setUser } from '../store/auth/auth.slice';
import { useEffect } from 'react';
import { useLazyGetCurrentUserQuery } from '../store/auth/auth.api';
import { routes } from '../configs/routes';

function Layout() {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [getCurrentUser, { isLoading }] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && !user && token)
      getCurrentUser()
        .unwrap()
        .then((userResponse) => dispatch(setUser(userResponse)))
        .catch(console.log);
  }, [isLoading, dispatch, user, token, getCurrentUser]);

  return (
    <>
      <header className="bg-[var(--gray-2)] border-b border-[var(--gray-6)]">
        <nav className="container p-4 mx-auto flex items-center flex-wrap justify-center sm:justify-between gap-4">
          <ul className="flex gap-4 items-center">
            <h2 className="text-2xl font-bold">
              <NavLink to={routes.home}>Team Quest</NavLink>
            </h2>
            {user && (
              <Button asChild variant="soft">
                <NavLink to={routes.editQuests}>
                  My quests <p className="pi pi-hammer"></p>
                </NavLink>
              </Button>
            )}
          </ul>
          <ul className="flex gap-2">
            {/* {isLoading && <Button loading variant="soft"/>} */}
            {user && <UserAvatar />}
            {!isLoading && !user && (
              <>
                <NavLink to={routes.login}>
                  <Button variant="soft">Login</Button>
                </NavLink>
                <NavLink to={routes.signup}>
                  <Button variant="soft">Registration</Button>
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
