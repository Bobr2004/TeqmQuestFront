import { Button, Card } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "../routes";
import toast from "react-hot-toast";
import { EditableQuest } from "./editQuestTypes";

function EditQuestCard({
   id,
   name,
   description,
   time,
   onDelete
}: EditableQuest & { onDelete: () => void }) {
   const deleteQuest = () => {
      onDelete();
      toast.success("Successfully deleted");
   };

   return (
      <article>
         <Card asChild>
            <Link to="" className="w-full">
               <div>
                  <h3 className="texx-lg font-bold">{name}</h3>
                  <p>{description}</p>

                  <div className="flex gap-2 justify-between">
                     {time ? (
                        <p>Time Limit: {time || "Not specified"}</p>
                     ) : (
                        <p></p>
                     )}
                     <div className="flex gap-2 items-center">
                        <Button
                           color="red"
                           size="1"
                           onClick={deleteQuest}
                           variant="soft"
                        >
                           Delete
                        </Button>
                        <Link to={routes.toEditQuest(id)}>
                           <Button size="1" variant="soft">
                              Edit <p className="pi pi-hammer"></p>
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </Link>
         </Card>
      </article>
   );
}

export default EditQuestCard;
