import {
   Avatar,
   Button,
   ScrollArea,
   TextField
} from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Message } from "./RoomPage";

type RoomChatProps = {
   messages: Message[];
   sendMessage: (message: string) => void;
};

function RoomChat({ sendMessage, messages }: RoomChatProps) {
   const [newMessage, setNewMessage] = useState("");

   const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference to the bottom of the chat container

   useEffect(() => {
      if (chatEndRef.current) {
         chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
       }
   }, [messages]);

   return (
      <section className="border-t md:border-l md:border-t-0 border-[var(--gray-6)] px-4 flex flex-col bg-[var(--gray-2)]">
         <h2 className="font-bold text-lg mt-2">Room's chat:</h2>
         <div className="flex-grow flex flex-col">
            <ScrollArea className="min-h-[35vh] max-h-[35vh] md:max-h-[75vh]  py-2 " ref={chatEndRef}>
               <ul className="space-y-2">
               {messages &&
                  messages.map((message, i) => (
                     <li key={i}>
                        <ChatMessage {...message} />
                     </li>
                  ))}
               </ul>
            </ScrollArea>
            {/* <Separator className="!w-full"/> */}
         </div>
         <div className="mb-2 grid grid-cols-5 gap-2">
            {["👍", "🎉", "😎", "💀", "🥶"].map((smile, i) => (
               <Button
                  color="gray"
                  variant="outline"
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
   const usernameSymbol = username[0];

   function getColor(): "grass" | "violet" | "blue" | "red" {
      if (username.length % 3 === 0) return "grass";
      if (username.length % 5 === 0) return "violet";
      if (username.length % 2 === 0) return "blue";
      return "red";
   }

   return (
      <div className="flex gap-1">
         <Avatar
            fallback={usernameSymbol}
            size="2"
            color={getColor()}
         />
         <div>
            <p className={`text-[0.75rem] ${getColor()}-ch -mt-[3px]`}>{username}</p>
            <p className="text-[var(--gray-11)] text-sm -mt-0.5">{message}</p>
         </div>
      </div>
   );
}
export default RoomChat;
