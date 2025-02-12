import { Avatar, Tooltip } from "@radix-ui/themes";

type PlayerCardProps = {
   username: string;
   image?: string;
   id: number;
};

function PlayerCard({ username, image }: PlayerCardProps) {
   return (
      <>
         {/* <Card className="!space-y-1"> */}
         <Tooltip content={username}>
            <div>
               <Avatar
                  src={image}
                  fallback={<p className="pi pi-user text-3xl"></p>}
                  size="6"
               />
            </div>
         </Tooltip>
         {/* <ScrollArea scrollbars="horizontal" className="!w-20">
            <h3>{name}</h3>
         </ScrollArea> */}
         {/* </Card> */}
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
