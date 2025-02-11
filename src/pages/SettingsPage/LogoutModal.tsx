import { Button, Dialog } from "@radix-ui/themes";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router";
import { useLazyLogoutQuery } from "../../store/auth/auth.api";
import { unsetUser } from "../../store/auth/auth.slice";
import { routes } from "../routes";

function LogoutModal() {
   const dispatch = useAppDispatch();
   const [logout, { isLoading }] = useLazyLogoutQuery();

   const navigate = useNavigate();

   const handleLogout = () => {
      if (!isLoading) {
         dispatch(unsetUser()); // REMOVE LATER
         navigate(routes.home);

         logout()
            .unwrap()
            .then(() => {
               dispatch(unsetUser());
            })
            .catch(console.log);
      }
   };
   return (
      <>
         <Dialog.Title className="text-center">
            Are you sure you want to log out?
         </Dialog.Title>
         <div className="flex gap-2 justify-center">
            <Dialog.Close>
               <Button variant="soft" color="gray">
                  Cancel
               </Button>
            </Dialog.Close>
            <Button color="red" onClick={handleLogout}>
               Logout <p className="pi pi-sign-out"></p>
            </Button>
         </div>
      </>
   );
}

export default LogoutModal;
