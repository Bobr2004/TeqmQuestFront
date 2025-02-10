import { NavLink, Outlet } from "react-router";
import { routes } from "../pages/routes";
import { Button } from "@radix-ui/themes";
import { useAppSelector } from "../store/store";

import UserAvatar from "./UserAvatar";

function Layout() {
   const { user } = useAppSelector((state) => state.auth);
   return (
      <>
         <header className="bg-[var(--accent-1)] border-b border-[var(--gray-6)]">
            <nav className="container p-4 mx-auto flex justify-between items-center">
               <ul className="flex gap-4 items-center">
                  <h2 className="text-2xl font-bold">
                     <NavLink to={routes.home}>App Title</NavLink>
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
                  {user ? (
                     <>
                        {/* <Button onClick={handleLogout}>Logout</Button> */}
                        <UserAvatar />
                     </>
                  ) : (
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
