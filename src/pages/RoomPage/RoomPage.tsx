import {
   Avatar,
   Button,
   Card,
   ScrollArea,
   Separator,
   TextField
} from "@radix-ui/themes";
import PlayerCard, { EmptyPlayer } from "./PlayerCard";
import { useState } from "react";
import RoomChat from "./RoomChat";

const maxPlayers = 6;

function RoomPage() {
   const [currentPlayers, setCurrentPlayers] = useState(0);

   const unActivePlayers = maxPlayers - currentPlayers;

   return (
      <div className="grid md:grid-cols-[3fr_1fr] h-full gap-2">
         <div className="p-4 flex flex-col">
            <section className="flex flex-col gap-12 flex-grow">
               <div className="flex justify-end">
                  <Card>
                     <h3 className="font-bold">Host: Akagami022</h3>
                     <p className="text-[var(--gray-10)]">Room id: 12</p>
                  </Card>
               </div>
               <h1 className="text-6xl font-bold text-center">
                  One piece quest
               </h1>
               <div className="flex justify-center">
                  <Button size="4" className="!px-20">
                     Start
                  </Button>
               </div>
            </section>
            <section>
               <h2 className="text-xl font-bold text-center">Players 4/6</h2>
               <Separator className="!w-full !my-4" />
               <ul className="flex gap-4 flex-wrap justify-center">
                  {Array.from({ length: unActivePlayers }, (_, index) => (
                     <li key={index}>
                        <EmptyPlayer />
                     </li>
                  ))}
               </ul>
            </section>
         </div>
         <RoomChat />
      </div>
   );
}

export default RoomPage;
