import { Avatar, Button, TextArea } from "@radix-ui/themes";
import { useAppSelector } from "../../store/store";

type CommetsSectionProps = {
   id: number;
};

function CommetsSection({ id }: CommetsSectionProps) {
   const user = useAppSelector((store) => store.auth.user);





   return (
      <section className="space-y-2 mb-4">
         <h2 className="font-bold text-lg">Comments:</h2>
         <div className="flex gap-2 items-stretch">
            <Avatar fallback="A" src={user?.image}  size="5"/>
            <TextArea className="flex-grow" />
            <div>
               <Button className="!h-full">Comment</Button>
            </div>
         </div>
      </section>
   );
}

export default CommetsSection;
