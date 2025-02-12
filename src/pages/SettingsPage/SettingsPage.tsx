import { Avatar, Button, Separator } from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Modal from "../../components/ui/Modal";
import Segments from "../../components/ui/Segments";
import LogoutModal from "./LogoutModal";
import ChangeImageForm from "./ChangeImageForm";
import { setTheme } from "../../store/auth/auth.slice";
import ClearCacheModal from "./ClearCacheModal";

function SettingsPage() {
   const { user, theme } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();

   return (
      <>
         <section className="max-w-[60ch] mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Account settings</h2>
            <div className="flex gap-4 items-end flex-wrap">
               <div className="flex flex-col gap-2">
                  <Avatar fallback="A" src={user?.image} size="8" />
                  <Modal
                     trigger={<Button variant="soft">Change Picture</Button>}
                     content={<ChangeImageForm />}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <h3 className="font-bold">{user?.username}</h3>
                  <p className="italic">{user?.email}</p>
                  <Modal
                     trigger={
                        <Button variant="soft" color="gray">
                           Logout <p className="pi pi-sign-out"></p>
                        </Button>
                     }
                     content={<LogoutModal />}
                  />
               </div>
               <div className="ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                  <Button color="red" variant="outline">
                     Delete account <p className="pi pi-trash"></p>
                  </Button>
               </div>
            </div>
         </section>
         <div className="max-w-[60ch] mx-auto mt-2">
            <Separator className="!w-full" />
         </div>
         <section className="max-w-[60ch] mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Application settings</h2>
            <div className="flex gap-4 items-center">
               <span>Appearance theme:</span>
               <Separator orientation="vertical" />
               <Segments
                  value={theme}
                  onValueChange={(val) => dispatch(setTheme(val))}
                  items={[
                     { value: "dark", title: "Dark" },
                     { value: "light", title: "Light" }
                  ]}
               />
            </div>
            <div className="mt-4 sm:mt-2 flex sm:justify-end">
               <Modal
                  trigger={
                     <Button color="red" variant="outline">
                        Clear cache
                     </Button>
                  }
                  content={<ClearCacheModal />}
               />
            </div>
         </section>
      </>
   );
}

export default SettingsPage;
