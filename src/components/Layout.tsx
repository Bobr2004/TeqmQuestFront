import { NavLink, Outlet } from "react-router";
import { routes } from "../pages/routes";
import { Button } from "@radix-ui/themes";

function Layout() {
   return (
      <>
         <header className="bg-[var(--accent-1)] border-b border-[var(--gray-6)]">
            <nav className="container p-4 mx-auto flex justify-between items-center">
               <h2 className="text-2xl font-bold">
                  <NavLink to={routes.home}>App Title</NavLink>
               </h2>
               <ul className="flex gap-2">
                  <NavLink to={routes.login}>
                     <Button>Login</Button>
                  </NavLink>
                  <NavLink to={routes.signup}>
                     <Button>Registration</Button>
                  </NavLink>
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
