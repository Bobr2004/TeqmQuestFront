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
      <section className="border-t md:border-l md:border-t-0 border-[var(--gray-6)] my-4 px-4 flex flex-col">
         <h2 className="font-bold text-lg">Room chat</h2>
         <div className="flex-grow flex flex-col">
            <ScrollArea className="max-h-[75vh] py-2">
               <ul className="space-y-2">
                  {messages &&
                     messages.map((message, i) => (
                        <>
                           {message.message && (
                              <li key={i}>
                                 <ChatMessage {...message} />
                              </li>
                           )}
                        </>
                     ))}
               </ul>
            </ScrollArea>
         </div>
         <div className="mb-2 grid grid-cols-5 gap-2">
            <Button color="gray" variant="soft">
               👍
            </Button>
            <Button color="gray" variant="soft">
               🎉
            </Button>
            <Button color="gray" variant="soft">
               😎
            </Button>
            <Button color="gray" variant="soft">
               💀
            </Button>
            <Button color="gray" variant="soft">
               🥶
            </Button>
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
               }}
            >
               Send
            </Button>
         </div>
      </section>
   );
}

function ChatMessage({ message, username }: Message) {
   const usernameSymbol = username ? username[0] : "A";

   return (
      <div className="flex gap-0.5">
         <Avatar fallback={usernameSymbol} size="1" />
         <p className="mr-0.5">:</p>
         <p className="text-[var(--gray-10)]">{message}</p>
      </div>
   );
}
export default RoomChat;
