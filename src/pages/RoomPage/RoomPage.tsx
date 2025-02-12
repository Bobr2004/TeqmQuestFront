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
         <section className="border-t md:border-l md:border-t-0 border-[var(--gray-6)] my-4 px-4 flex flex-col">
            <h2 className="font-bold text-lg">Room chat</h2>
            <div className="flex-grow flex flex-col">
               <ScrollArea className="max-h-[75vh] py-2">
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Accusamus animi unde id earum. Minus laboriosam esse, harum
                     ipsum in praesentium, ipsa possimus et, eius numquam totam
                     optio quisquam cumque nesciunt exercitationem. Eaque
                     obcaecati molestiae molestias consequuntur mollitia eum rem
                     tempora libero nihil iusto quos, officia quidem. Placeat
                     totam atque beatae debitis nulla quae reprehenderit iste
                     sunt quaerat vitae. Nobis consequuntur, ratione nemo, cum
                     dolorem eveniet sunt rerum animi, culpa distinctio aut
                     minus iste optio labore voluptatem quidem deleniti fuga
                     dolores repudiandae quia pariatur quod ex architecto
                     dignissimos! Debitis fugit culpa perspiciatis, quia, quos
                     unde porro tempore aliquam, quas facere qui! Deserunt
                     aliquid aliquam nam beatae nulla, itaque, illum eveniet
                     accusantium odio reprehenderit ea quasi necessitatibus a
                     officiis ducimus expedita magnam! Autem iste deserunt sunt
                     ratione dolores nulla. Molestias tenetur modi cupiditate
                     earum optio eaque, quod laudantium fuga sapiente
                     consectetur vitae sit est eligendi! Illum odio harum
                     delectus labore veritatis molestiae odit, praesentium nemo
                     fugiat aspernatur saepe commodi? Consequuntur maiores ullam
                     explicabo deleniti suscipit dicta ea fugiat, magni labore
                     autem modi sint quod nostrum, tenetur id sequi repellendus
                     quaerat incidunt atque dolores. Alias fuga provident,
                     cumque quisquam quia placeat illum adipisci quod debitis
                     optio fugiat voluptatem ullam delectus quo perferendis rem
                     eum? Quia totam iure voluptate assumenda aliquam dolor vero
                     sequi rem repellat, eligendi nemo consectetur, quos soluta
                     corrupti voluptatibus, cumque deleniti quisquam id modi
                     odio temporibus! Eum vero recusandae ex necessitatibus quam
                     excepturi praesentium culpa harum dolore, dicta dolorem
                     nulla voluptatem quod voluptate odio adipisci laboriosam
                     consequuntur, tempore eveniet quae explicabo aliquid. Nemo
                     ullam totam voluptatum illum repudiandae. Modi at
                     voluptatum blanditiis delectus voluptates adipisci tempore
                     officiis minima quibusdam tempora? Fugiat unde a corporis!
                     Ad quis labore illum reiciendis explicabo optio. Libero, ad
                     qui? Labore similique odio et, itaque expedita
                     reprehenderit eaque ipsa sequi, deleniti ipsum excepturi
                     tempora sunt optio autem neque assumenda cumque magnam
                     maxime praesentium. Beatae optio amet, ad placeat porro
                     accusamus consequatur doloribus autem quibusdam illum
                     dolorum laborum, cumque consequuntur repudiandae eius
                     cupiditate ea aliquid dicta blanditiis possimus qui
                     provident, similique vero asperiores? Perspiciatis error
                     officiis molestiae vero exercitationem voluptatum.
                     Deleniti, aperiam? Quis quaerat aliquid nobis corporis
                     earum ipsam in totam provident qui, explicabo deserunt
                     accusamus modi, natus est itaque ab quibusdam velit? Atque,
                     explicabo magni. Adipisci dicta harum, quidem provident
                     repudiandae necessitatibus temporibus atque maxime optio
                     fugiat, quaerat voluptatum perspiciatis accusamus sapiente
                     aliquid quos impedit, saepe corporis. Qui quo beatae totam
                     consequatur consectetur enim impedit et dicta, sunt,
                     sapiente quod fuga at minima. Commodi eaque, dolorem
                     temporibus sapiente doloremque velit maiores iure inventore
                     ratione aspernatur architecto, quam unde saepe accusantium
                     reprehenderit ea quaerat? Libero expedita facilis,
                     temporibus aliquam nemo distinctio magni iste voluptate
                     dicta aliquid odit nesciunt enim soluta! Excepturi,
                     mollitia magnam doloribus distinctio rem itaque et cumque
                     animi facilis quia voluptas beatae dignissimos incidunt
                     iure nostrum corrupti fuga nihil natus! Deserunt,
                     voluptates. Et quibusdam repudiandae distinctio deserunt
                     quo ad alias quidem perspiciatis nemo, possimus, nam
                     excepturi nobis sunt aliquid nihil quia cumque praesentium
                     maiores error neque molestiae ipsum voluptates eaque
                     fugiat! Dolor aut iste facilis.
                  </p>
               </ScrollArea>
            </div>
            <div className="mb-2 flex gap-2">
               <Button color="gray" variant="soft">
                  <p className="pi pi-cog"></p>
               </Button>
               <Button color="gray" variant="soft">
                  <p className="pi pi-cog"></p>
               </Button>
               <Button color="gray" variant="soft">
                  <p className="pi pi-cog"></p>
               </Button>
            </div>
            <div className="flex gap-2 pb-4">
               <TextField.Root className="flex-grow" placeholder="Message" />
               <Button className="">Send</Button>
            </div>
         </section>
      </div>
   );
}

export default RoomPage;
