import { useState } from "react";
import { Link, useParams } from "react-router";
import { EditableQuest } from "../EditQuestsPage/editQuestTypes";
import NotFoundPage from "../NotFoundPage";
import { Button, Separator } from "@radix-ui/themes";
import Modal from "../../components/ui/Modal";
import QuestForm from "../../components/QuestForm";
import TaskForm from "./TaskForm";
import ImageInput from "../../components/ImageInput";
import NewTaskCard from "./NewTaskCard";
import TaskCard from "./TaskCard";
import toast from "react-hot-toast";
import { routes } from "../../App";

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

   const [tasksList, setTasksList] = useState<any[]>([]);

   const [image, setImage] = useState<File | null>(null);

   const addNewTask = (task: any) => {
      setTasksList((tl) => [...tl, task]);
   };

   const deleteTask = (taskId: number) => () => {
      setTasksList((tl) => tl.filter((task) => task.id !== taskId));
   };

   return (
      <section className="container mx-auto p-4">
         {/* <h2 className="text-center text-2xl font-bold mb-2">Quest {id}</h2> */}
         <div className="grid md:grid-cols-[1fr_2fr] gap-4">
            <div className="space-y-3">
               <h2 className="text-3xl font-bold text-center">{name}</h2>
               <ImageInput setImageState={setImage} />
               <p>
                  <span className="text-[var(--gray-10)]">{description}</span>
               </p>

               {time && <p>Time Limit: {time || "Not specified"}</p>}

               <Modal
                  trigger={<Button variant="soft">Edit quest info</Button>}
                  content={
                     <QuestForm
                        update={update}
                        id={Number(id)}
                        formTitle="Update quest info"
                        {...{ name, description }}
                        time={time || undefined}
                     />
                  }
               />
               <Separator className="md:!hidden !w-full !mt-4" />
            </div>
            <div className="space-y-3">
               <h2 className="text-3xl font-bold text-center">
                  Tasks ({tasksList.length}/5)
               </h2>
               {tasksList.length > 0 &&
                  tasksList.map((task) => (
                     <TaskCard
                        onDelete={deleteTask(task.id)}
                        title={task.title}
                        image={task.image}
                        openAnswer={task.openAnswer}
                        options={task.options}
                     />
                  ))}
               {JSON.stringify(tasksList)}
               <Modal
                  trigger={
                     <div>
                        <NewTaskCard />
                     </div>
                  }
                  content={<TaskForm addNewTask={addNewTask} />}
               />
            </div>
         </div>
         <div className="flex justify-end gap-2 mt-8">
            <Link to={routes.editQuests}>
               <Button color="gray" variant="soft">
                  Back
               </Button>
            </Link>
            <Button
               variant="soft"
               onClick={() => toast.error("Feature is not added yet")}
            >
               Save locally
            </Button>
            <Button>Publish</Button>
         </div>
      </section>
   );
}

export default EditQuestPage;
