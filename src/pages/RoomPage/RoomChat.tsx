import { Avatar, Button, ScrollArea, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Message } from "./RoomPage";

type RoomChatProps = {
   messages: Message[];
   sendMessage: (message: string) => void;
};

function RoomChat({ sendMessage, messages }: RoomChatProps) {
   const [newMessage, setNewMessage] = useState("");
   return (
      <section className="border-t md:border-l md:border-t-0 border-[var(--gray-6)] px-4 flex flex-col bg-[var(--accent-1)]">
         <h2 className="font-bold text-lg mt-2">Room's chat:</h2>
         <div className="flex-grow flex flex-col">
            <ScrollArea className="max-h-[75vh] py-2">
               <ul className="space-y-2">
                  {messages &&
                     messages.map((message, i) => (
                        <li key={i}>
                           <ChatMessage {...message} />
                        </li>
                     ))}
               </ul>
            </ScrollArea>
         </div>
         <div className="mb-2 grid grid-cols-5 gap-2">
            {["👍", "🎉", "😎", "💀", "🥶"].map((smile, i) => (
               <Button
                  color="gray"
                  variant="soft"
                  onClick={() => {
                     sendMessage(smile);
                  }}
                  key={i}
               >
                  {smile}
               </Button>
            ))}
         </div>
         <div className="flex gap-2 pb-4">
            <TextField.Root
               className="flex-grow"
               placeholder="Message"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button
               disabled={!newMessage}
               onClick={() => {
                  sendMessage(newMessage);
                  setNewMessage("");
               }}
            >
               Send
            </Button>
         </div>
      </section>
   );
}

function ChatMessage({ message, username }: Message) {
   const usernameSymbol = username ? (
      username[0]
   ) : (
      <p className="pi pi-user"></p>
   );

   function getColor(n: number): "green" | "violet" | "blue" | "red" {
      if (n % 3 === 0) return "green";
      if (n % 5 === 0) return "violet";
      if (n % 2 === 0) return "blue";
      return "red";
   }

   return (
      <div className="flex gap-0.5">
         <Avatar
            fallback={usernameSymbol}
            size="1"
            color={getColor(username.length)}
         />
         <p className="mr-0.5">:</p>
         <p className="text-[var(--gray-10)]">{message}</p>
      </div>
   );
}
export default RoomChat;
