import { useState } from "react";
import { useParams } from "react-router";
import { EditableQuest } from "../EditQuestsPage/editQuestTypes";
import NotFoundPage from "../NotFoundPage";
import { Button } from "@radix-ui/themes";
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

   const [tasksList, setTasksList] = useState([]);

   return (
      <section className="container mx-auto p-4">
         <div className="space-y-3 max-w-[40ch] mx-auto">
            <h2 className="text-3xl font-bold text-center">{name}</h2>
            <p>
               Description: <br />
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
               rem sequi temporibus maxime quaerat fuga, in aliquam quod itaque
               harum nam minus veniam exercitationem aliquid eos doloribus
               recusandae nisi iste nulla molestiae, mollitia, quae ipsam ipsum.
               Odit nulla officia vitae?
            </p>

            {time && <p>Time Limit: {time || "Not specified"}</p>}

            <Modal
               trigger={<Button>Edit quest info</Button>}
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
            <Modal trigger={<Button>add task</Button>} content={<TaskForm />} />
         </div>
      </section>
   );
}



// Create task
// type body ={
//    questId: number;
//    taskTitle: string;
//    openAnswer: string;
//    options: {
//          title: string;
//          isTrue: boolean;
//       }[]
// }




// const fd = new FormData()

// fd.append("test", )
// fd.append("audio", )

export default EditQuestPage;
