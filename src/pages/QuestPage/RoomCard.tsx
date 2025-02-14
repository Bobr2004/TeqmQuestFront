import { Button, Card, Dialog, Spinner } from "@radix-ui/themes";
import { Room } from "../../store/room/room.api";
import { Link, useNavigate } from "react-router";
import { routes } from "../../configs/routes";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/store";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";

function RoomCard({ id, title, isActive }: Room) {
   return (
      <article>
         <Modal
            trigger={
               <Card asChild>
                  <Link to={""} className="!flex !justify-between !gap-2">
                     <div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-[var(--gray-10)] text-sm">
                           Room id: {id}
                        </p>
                     </div>
                     <div>
                        {isActive && (
                           <p className="text-[var(--gray-10)]">Started</p>
                        )}
                        {!isActive && (
                           <p className="text-[var(--grass-10)]">
                              Waiting for players
                           </p>
                        )}
                     </div>
                  </Link>
               </Card>
            }
            content={<LoadingModal id={id} />}
         />
      </article>
   );
}

function wait(seconds: number) {
   return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
   });
}

function LoadingModal({ id }: { id: number }) {
   const user = useAppSelector((store) => store.auth.user);
   const navigate = useNavigate();

   const [isLoggedIn, setIsLoggedIn] = useState(true);

   useEffect(() => {}, [
      (async () => {
         await wait(0.5);
         if (!user) setIsLoggedIn(false);
         else navigate(routes.toRoom(String(id)));
      })()
   ]);

   if (!isLoggedIn)
      return (
         <>
            <Dialog.Title className="justify-center flex gap-2 items-center text-[var(--red-10)]">
               You are not logged in!
               <i className="pi pi-times-circle " />
            </Dialog.Title>
            <div className="flex gap-2 justify-center">
               <Dialog.Close>
                  <Button variant="soft" color="gray">
                     Cancel
                  </Button>
               </Dialog.Close>
               <Link to={routes.login}>
                  <Button color="red">
                     Login <p className="pi pi-sign-in"></p>
                  </Button>
               </Link>
            </div>
         </>
      );

   return (
      <div className="flex justify-center items-center gap-4">
         <h2 className="text-xl font-bold">Connecting to room...</h2>
         <Spinner size="3" />
      </div>
   );
}

export default RoomCard;
