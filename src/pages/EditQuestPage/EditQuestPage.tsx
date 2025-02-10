import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { EditableQuest } from "../EditQuestsPage/editQuestTypes";
import NotFoundPage from "../NotFoundPage";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import ErrorFormMessage from "../../components/ErrorFormMessage";
import Modal from "../../components/ui/Modal";
import QuestForm from "../../components/QuestForm";
import { routes } from "../routes";
import TaskForm from "./TaskForm";

function EditQuestPage() {
   const { id } = useParams();

   const [localQuestsState, setLocalQuestsState] = useState<EditableQuest[]>(
      () => {
         const localQuestsString = localStorage.getItem("localQuests");
         if (!localQuestsString) return [];
         return JSON.parse(localQuestsString);
      }
   );

   const [localQuest, setLocalQuest] = useState<EditableQuest | undefined>(
      () => {
         return localQuestsState.find((quest) => String(quest.id) === id);
      }
   );

   if (!localQuest) return <NotFoundPage />;

   const { name, description, time } = localQuest;

   const update = (data: EditableQuest) => {
      setLocalQuest(data);
   };

   return (
      <section className="container mx-auto p-4">
         <div className="space-y-3">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p>{description}</p>

            {time && <p>Time Limit: {time || "Not specified"}</p>}

            <Modal
               trigger={<Button>Edit</Button>}
               content={
                  <QuestForm
                     update={update}
                     redirect={routes.toEditQuest(String(id))}
                     id={Number(id)}
                     formTitle="Update quest info"
                     {...{ name, description }}
                     time={time || undefined}
                  />
               }
            />
         </div>
         <div>
            <Modal trigger={<Button>add task</Button>} content={<TaskForm/>}/>
         </div>
      </section>
   );
}

export default EditQuestPage;
