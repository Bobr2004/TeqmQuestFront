import { useEffect, useState } from "react";
import { EditableQuest } from "./editQuestTypes";
import EditQuestCard from "./EditQuestCard";
import { Card, Separator, Tooltip } from "@radix-ui/themes";
import { useLocation } from "react-router";
import { useGetQuestsByUserIdQuery } from "../../store/quest/quest.api";
import { useAppSelector } from "../../store/store";
function EditQuestsPage() {
   const location = useLocation();
   const specialQuestId = location.state?.questId;
   console.log(location);

   const [localQuestsState, setLocalQuestsState] = useState<EditableQuest[]>(
      () => {
         const localQuestsString = localStorage.getItem("localQuests");
         if (!localQuestsString) return [];
         const localQuests: EditableQuest[] = JSON.parse(localQuestsString);
         return localQuests.sort((quest1, quest2) => quest2.id - quest1.id);
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

   const user = useAppSelector((store) => store.auth.user);

   const userId = user?.id as number;

   const { data: quests, isLoading } = useGetQuestsByUserIdQuery(userId);

   return (
      <>
         <section className="container mx-auto p-4">
            <div className="flex gap-2 items-center">
               <h2 className="font-bold text-xl">Unpublished quests:</h2>
               <Tooltip content="Storred in browser cache">
                  <p className="pi pi-info-circle"></p>
               </Tooltip>
            </div>
            {localQuestsState && localQuestsState.length ? (
               <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full py-2">
                  {localQuestsState.map((localQuest) => (
                     <li key={localQuest.id}>
                        <EditQuestCard
                           {...localQuest}
                           isSpecial={localQuest.id == specialQuestId}
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
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full py-2">
               {quests &&
                  quests.map((quest) => (
                     <EditQuestCard
                        isPublished={true}
                        name={quest.title}
                        description={quest.description}
                        id={quest.id}
                        time={Number(quest.timeLimit)}
                     />
                  ))}
            </ul>
         </section>
      </>
   );
}

export default EditQuestsPage;
