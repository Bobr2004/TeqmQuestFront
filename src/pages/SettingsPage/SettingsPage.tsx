import { Avatar, Button, Separator } from "@radix-ui/themes";
import { useAppSelector } from "../../store/store";
import Modal from "../../components/ui/Modal";
import Segments from "../../components/ui/Segments";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

function SettingsPage() {
   const { user } = useAppSelector((state) => state.auth);

   const [appearanceTheme, setAppearanceTheme] = useState("dark");

   return (
      <>
         <section className="max-w-[60ch] mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
               Account settings
            </h2>
            <div className="flex gap-4 items-end ">
               <div className="flex flex-col gap-1">
                  <Avatar fallback="A" src={user?.image} size="8" />
                  <Modal
                     trigger={<Button variant="soft">Change Picture</Button>}
                     content={<>Yay</>}
                  />
               </div>
               <div className="flex flex-col gap-1">
                  <h3 className="font-bold">{user?.username}</h3>
                  <p className="italic">{user?.email}</p>
                  <Modal
                     trigger={
                        <Button variant="soft">
                           Logout <p className="pi pi-sign-out"></p>
                        </Button>
                     }
                     content={<LogoutModal />}
                  />
               </div>
               <div className="flex flex-col gap-1 ml-auto">
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
            <h2 className="text-2xl font-bold mb-4">
               Application settings
            </h2>
            <div className="flex gap-4 items-center">
               <span>Appearance theme:</span>
               <Separator orientation="vertical" />
               <Segments
                  value={appearanceTheme}
                  onValueChange={setAppearanceTheme}
                  items={[
                     { value: "dark", title: "Dark" },
                     { value: "light", title: "Light" }
                  ]}
               />
            </div>
            <div className="mt-2 flex justify-end">
               <Button color="red" variant="outline">
                  Clear cache
               </Button>
            </div>
         </section>
      </>
   );
}

export default SettingsPage;
