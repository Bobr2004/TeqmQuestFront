import { ChangeEvent, useRef } from "react";
import {
   useChangeAvatarMutation,
   useLazyLogoutQuery
} from "../store/auth/auth.api";
import { Avatar, Button, Card, Dialog, Popover } from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../store/store";
import Popup from "./ui/Popup";
import { NavLink } from "react-router";
import { routes } from "../pages/routes";
import Modal from "./ui/Modal";
import { unsetUser } from "../store/auth/auth.slice";

const UserAvatar = () => {
   const { user } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();
   const [logout, { isLoading }] = useLazyLogoutQuery();

  //  const [changeAvatar, { isLoading: isAvatarChanging }] =
  //     useChangeAvatarMutation();
  //  const fileInputRef = useRef<HTMLInputElement>(null);

  //  const handleChangeAvatar = () => {
  //     if (fileInputRef.current && !isAvatarChanging) {
  //        fileInputRef.current.click();
  //     }
  //  };

  //  const handleSaveAvatar = (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files.length) {
  //        const fd = new FormData();
  //        fd.append("image", e.target.files[0]);

  //        changeAvatar(fd)
  //           .unwrap()
  //           .then(() => {})
  //           .catch(console.log);
  //     }
  //  };

   const handleLogout = () => {
      if (!isLoading) {
         dispatch(unsetUser()); // REMOVE LATER
         logout()
            .unwrap()
            .then(() => dispatch(unsetUser()))
            .catch(console.log);
      }
   };

   if (user)
      return (
         <Popup
            trigger={
               <div className="cursor-pointer">
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!p-1 !flex !gap-2 !items-center"
                  >
                    
                     <Avatar fallback="A" src={user.image} size="2" />
                     <p className="mr-1">{user.username}</p>
                  </Button>
               </div>
            }
            content={
               <div className="flex flex-col gap-3">
                  <p>Username: {user.username}</p>
                  <Button asChild>
                     <NavLink to={routes.home}>Settings</NavLink>
                  </Button>
                  <Modal
                     trigger={<Button color="red">Logout</Button>}
                     content={
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
                                 Logout
                              </Button>
                           </div>
                        </>
                     }
                  />
               </div>
            }
         />

         // <Popover.Root>
         //   <Popover.Trigger>
         //     {/* trigger does not work when avatar renders fallback, therefore added div*/}
         //     <div>
         //       <Avatar fallback="A" src={user.image} size="2"/>
         //     </div>
         //   </Popover.Trigger>
         //   <Popover.Content>
         //     <p>{user.username}</p>
         //     <Button onClick={handleChangeAvatar}>Change avatar</Button>
         //     <input
         //       type="file"
         //       accept="image/*"
         //       style={{ display: 'none' }}
         //       ref={fileInputRef}
         //       onChange={handleSaveAvatar}
         //     />
         //   </Popover.Content>
         // </Popover.Root>
      );
};

export default UserAvatar;
