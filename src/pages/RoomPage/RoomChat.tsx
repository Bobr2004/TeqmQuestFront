import { Avatar, Button, ScrollArea, TextField } from "@radix-ui/themes";
import { useState } from "react";

function RoomChat() {
   const [newMessage, setNewMessage] = useState("");
   return (
      <section className="border-t md:border-l md:border-t-0 border-[var(--gray-6)] my-4 px-4 flex flex-col">
         <h2 className="font-bold text-lg">Room chat</h2>
         <div className="flex-grow flex flex-col">
            <ScrollArea className="max-h-[75vh] py-2">
               <ul className="space-y-2">
                  <li>
                     <ChatMessage />
                  </li>
                  <li>
                     <ChatMessage />
                  </li>
                  <li>
                     <ChatMessage />
                  </li>
                  <li>
                     <ChatMessage />
                  </li>
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
            <Button disabled={!newMessage}>Send</Button>
         </div>
      </section>
   );
}

function ChatMessage() {
   return (
      <div className="flex gap-0.5">
         <Avatar fallback="a" size="1" />
         <p className="mr-0.5">:</p>
         <p className="text-[var(--gray-10)]">Message test</p>
      </div>
   );
}
export default RoomChat;
