import { useEffect, useState } from "react";
import { EditableQuest } from "./editQuestTypes";
import EditQuestCard from "./EditQuestCard";
import { Separator } from "@radix-ui/themes";

function EditQuestsPage() {
   const [localQuestsState, setLocalQuestsState] = useState<EditableQuest[]>(
      () => {
         const localQuestsString = localStorage.getItem("localQuests");
         let localQuests: EditableQuest[] = [];
         if (localQuestsString) localQuests = JSON.parse(localQuestsString);
         localQuests = localQuests.sort(
            (quest1, quest2) => quest2.id - quest1.id
         );
         return localQuests;
      }
   );

   const deleteLocalQuestHandler = (id: number) => () => {
      setLocalQuestsState((localquests) =>
         localquests.filter((quest) => quest.id !== id)
      );
   };

   useEffect(() => {
      localStorage.setItem("localQuests", JSON.stringify(localQuestsState));
   }, [localQuestsState]);
   return (
      <>
         <section className="container mx-auto p-4">
            <h2 className="font-bold text-xl">Unpublished quests:</h2>

            {localQuestsState ? (
               <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full py-2">
                  {localQuestsState.map((localQuest) => (
                     <li key={localQuest.id}>
                        <EditQuestCard
                           {...localQuest}
                           onDelete={deleteLocalQuestHandler(localQuest.id)}
                        />
                     </li>
                  ))}
               </ul>
            ) : (
               <p>You have 0 unpublished quests</p>
            )}
         </section>
         <div className="container mx-auto px-4">
            <Separator className="!w-full" />
         </div>
         <section className="container mx-auto p-4">
            <h2 className="font-bold text-xl">Published quests:</h2>
         </section>
      </>
   );
}

export default EditQuestsPage;
