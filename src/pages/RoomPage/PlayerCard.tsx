import { Avatar, Button, Tooltip } from "@radix-ui/themes";
import { useAppSelector } from "../../store/store";
import Popup from "../../components/ui/Popup";
import toast from "react-hot-toast";

type PlayerCardProps = {
   hostname: string;
   username: string;
   image?: string;
   id: number;
};

function PlayerCard({ username, image, hostname }: PlayerCardProps) {
   const user = useAppSelector((store) => store.auth.user);

   return (
      <>
         <Popup
            trigger={
               <div className="relative">
                  {hostname === username && (
                     <p className="absolute w-full text-[var(--accent-10)] text-center -top-3 text-sm bg-[var(--gray-2)]/80 rounded-[var(--radius-4)]">
                        Host <i className="pi pi-crown"></i>
                     </p>
                  )}
                  <Button variant="ghost" color="gray">
                     <Avatar
                        src={image}
                        fallback={<p className="pi pi-user text-3xl"></p>}
                        size="6"
                     />
                  </Button>
               </div>
            }
            content={
               <div className="-my-2 -mx-1 flex flex-col gap-1">
                  <p>{username}</p>
                  <Button className="!justify-start"

                     variant="ghost"
                     color="gray"
                     onClick={() => {
                        toast.error("This feature is not added yet");
                     }}
                  >
                     Report
                     <i className="pi pi-flag-fill"></i>
                  </Button>
                  {user?.username === hostname && (
                     <Button className="!justify-start"

                        variant="ghost"
                        color="red"
                        onClick={() => {
                           toast.error("This feature is not added yet");
                        }}
                     >
                        Kick player
                     </Button>
                  )}
               </div>
            }
         />
      </>
   );
}

function EmptyPlayer() {
   return (
      <>
         <Avatar
            fallback={<p className="pi pi-user text-3xl"></p>}
            size="6"
            color="gray"
         />
      </>
   );
}

export { EmptyPlayer };

export default PlayerCard;
