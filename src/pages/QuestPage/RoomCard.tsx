import { Card } from "@radix-ui/themes";
import { Room } from "../../store/room/room.api";
import { Link } from "react-router";
import { routes } from "../../configs/routes";
import toast from "react-hot-toast";

function RoomCard({ id, title, isActive }: Room) {
   const onClick = () => {
      if (isActive) toast.error(`Quest has already started`);
   };

   return (
      <article>
         <Card asChild>
            <Link
               onClick={onClick}
               to={!isActive ? routes.toRoom(String(id)) : ""}
               className="!flex !justify-between !gap-2"
            >
               <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-[var(--gray-10)] text-sm">Room id: {id}</p>
               </div>
               <div>
                  {isActive && <p className="text-[var(--gray-10)]">Started</p>}
                  {!isActive && (
                     <p className="text-[var(--grass-10)]">Waiting for players</p>
                  )}
               </div>
            </Link>
         </Card>
      </article>
   );
}

export default RoomCard;
