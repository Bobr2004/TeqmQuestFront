import { Avatar, Button, Card, Separator, TextArea, TextField } from "@radix-ui/themes";

function RoomPage() {
   return (
      <div className="grid md:grid-cols-[3fr_1fr] h-full gap-2">
         <div className="p-4 flex flex-col">
            <section className="flex flex-col gap-12 flex-grow">
               <div className="flex justify-end">
                  <Card>
                     <h2>
                        Room code: <b className="font-bold">SDKZ</b>
                     </h2>
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
                  <Avatar fallback="O" size="8" />
                  <Avatar fallback="O" size="8" />
                  <Avatar fallback="O" size="8" />
                  <Avatar fallback="O" size="8" />
                  <Avatar fallback="O" size="8" />
               </ul>
            </section>
         </div>
         <section className="border-t md:border-l md:border-t-0 border-[var(--gray-6)] my-4 px-4 flex flex-col">
            <div className="flex-grow"></div>
            <div className="flex gap-2 pb-4">
               <TextField.Root className="flex-grow" />
               <Button className="">Send</Button>
            </div>
         </section>
      </div>
   );
}

export default RoomPage;
