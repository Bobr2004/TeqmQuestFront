import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
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
import { backendAPI, routes } from "../../configs/routes";
import { useAppSelector } from "../../store/store";
import { minutesToHHMMSS } from "../../functions/utils";



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

   const deleteLocalQuest = (id: number) => {
      setLocalQuestsState((localquests) =>
         localquests.filter((quest) => quest.id !== id)
      );
   };

   useEffect(() => {
      localStorage.setItem("localQuests", JSON.stringify(localQuestsState));
   }, [localQuestsState]);

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

   //  Publishing
   const token = useAppSelector((state) => state.auth.token);

   const [isPublishing, setIsPublishing] = useState<string | null>(null);

   const navigate = useNavigate();

   const publish = async () => {
      // TODO: validation

      setIsPublishing("Publishing quest");
      let createdQuestId: number | null = null;
      {
         const fd = new FormData();
         image && fd.append("image", image);
         fd.append(
            "quest",
            JSON.stringify({
               title: name,
               description,
               time: time ? minutesToHHMMSS(time) : null
            })
         );
         try {
            const { data } = await backendAPI(token).post("/api/quests", fd);
            createdQuestId = data.id;
            toast.success("Quest information was uploaded");
         } catch {
            toast.error("Quest information was not uploaded");
         }
      }

      for (let [index, task] of tasksList.entries()) {
         index += 1;
         setIsPublishing(`Publishing task ${index}`);

         const fd = new FormData();
         task.image && fd.append("image", task.image);

         const { image, ...taskData } = task;
         fd.append(
            "task",
            JSON.stringify({
               questId: createdQuestId,
               ...taskData
            })
         );
         try {
            await backendAPI(token).post("/api/tasks", fd);
            toast.success(`Task ${index} was uploaded`);
         } catch {
            toast.error(`Task ${index} was not uploaded`);
         }
      }

      setIsPublishing(null);
      toast.success("Quest was fully uploaded");
      deleteLocalQuest(Number(id));
      navigate(routes.home, { replace: true });
   };

   return (
      <section className="container mx-auto p-4">
         <div className="grid md:grid-cols-[1fr_2fr] gap-4">
            <div className="space-y-3">
               <h2 className="text-3xl font-bold text-center">{name}</h2>
               <ImageInput setImageState={setImage} />
               <p className="text-[var(--gray-10)]">{description}</p>

               {time && <p>Time Limit: {minutesToHHMMSS(time) || "Not specified"}</p>}

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
         <div className="flex justify-end gap-2 mt-8 items-center">
            {!isPublishing ? (
               <>
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
               </>
            ) : (
               <p className="text-[var(--gray-10)]">{isPublishing}</p>
            )}

            <Button loading={!!isPublishing} onClick={publish}>
               Publish
            </Button>
         </div>
      </section>
   );
}

export default EditQuestPage;
