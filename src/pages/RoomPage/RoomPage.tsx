import {
   Avatar,
   Button,
   Card,
   ScrollArea,
   Separator,
   Spinner,
   TextField
} from "@radix-ui/themes";
import PlayerCard, { EmptyPlayer } from "./PlayerCard";
import { useEffect, useState } from "react";
import RoomChat from "./RoomChat";
import { useGetRoomByIdQuery } from "../../store/room/room.api";
import { useParams } from "react-router";
import { useAppSelector } from "../../store/store";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import RoomTasks from "./RoomTasks";
import { User } from "../../store/auth/auth.slice";

const maxPlayers = 6;

export type Message = {
   username: string;
   message: string;
};

const SOCKET_URL = `http://ec2-13-60-43-26.eu-north-1.compute.amazonaws.com/ws`;

const TOPIC = (id: number) => `/topic/chat/${id}`;
const SEND_ENDPOINT = (id: number) => `/app/chat/${id}`;

const PLAYERS_TOPIC = (id: number) => `/topic/room/${id}`;
const SEND_PLAYER = (id: number) => `/app/room/${id}`;

function RoomPage() {
   const { id } = useParams();
   const [client, setClient] = useState<Client | null>(null);

   const [messages, setMessages] = useState<Message[]>([]);

   const token = useAppSelector((store) => store.auth.token);

   const [players, setPlayers] = useState<User[]>([]);

   useEffect(() => {
      const client = new Client({
         webSocketFactory: () => new SockJS(`${SOCKET_URL}?token=${token}`),
         onConnect: () => {
            console.log("Connected oleg");

            client.subscribe(TOPIC(Number(id)), (message) => {
               const newMessage: Message = JSON.parse(message.body);
               setMessages((prevMessages) => [...prevMessages, newMessage]);
               console.log("ogo negar");
            });

            // // Players socket
            // client.subscribe(PLAYERS_TOPIC(Number(id)), (message) => {
            //    const playersList: User[] = JSON.parse(message.body);
            //    setPlayers(playersList);
            //    console.log("Ogo players list");
            //    // console.log(playersList);
            // });

            // client.publish({
            //    destination: SEND_PLAYER(Number(id))
            // });
         }
      });
      client.activate();
      setClient(client);
   }, []);

   const user = useAppSelector((store) => store.auth.user);

   const sendMessage = (message: string) => {
      console.log("yay");
      if (client && client.connected) {
         client.publish({
            destination: SEND_ENDPOINT(Number(id)),
            body: JSON.stringify({ message: message, username: user?.username })
         });
      } else {
         console.error("Client is not connected");
      }
   };

   const [currentPlayers, setCurrentPlayers] = useState(0);
   const unActivePlayers = maxPlayers - currentPlayers;
   const { data: roomData, isLoading: isRoomLoading } = useGetRoomByIdQuery(
      Number(id)
   );
   console.log(roomData);

   if (isRoomLoading)
      return (
         <>
            <section className="container mx-auto p-4 flex justify-center">
               <Spinner size="3" />
            </section>
         </>
      );
   if (roomData)
      return (
         <div className="grid md:grid-cols-[3fr_1fr] h-full gap-2">
            <div className="p-4 flex flex-col h-[92vh] md:h-auto">
               <section className="flex flex-col gap-12 flex-grow">
                  <div className="flex justify-start">
                     <Card>
                        <h3 className="font-bold">Host: {roomData.username}</h3>
                        <p className="text-[var(--gray-10)] text-sm">
                           Room id: {roomData.id}
                        </p>
                     </Card>
                  </div>
                  <div className="flex justify-center">
                     <div>
                        <p className="text-[var(--gray-10)]">Quest: </p>
                        <h1 className="text-6xl font-bold text-center">
                           {roomData.quest.title}
                        </h1>
                     </div>
                  </div>
                  <RoomTasks id={roomData.quest.id} />
                  <div className="flex justify-center">
                     <Button
                        size="4"
                        className="!px-20"
                        disabled={roomData.username !== user?.username}
                     >
                        Start the quest
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
            <RoomChat sendMessage={sendMessage} messages={messages} />
         </div>
      );
}

export default RoomPage;
