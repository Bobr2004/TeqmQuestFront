import { useEffect, useState } from "react";
import { backendAPI } from "../../configs/routes";
import { useAppSelector } from "../../store/store";
import toast from "react-hot-toast";
import ImageWithLoader from "../../components/ImageWithLoader";
import { TextField } from "@radix-ui/themes";
import OptionCards from "../../components/ui/OptionCards";
import Segments from "../../components/ui/Segments";

type OptionType = {
   id: number;
   title: string;
   isTrue: boolean;
};

type TaskType = {
   id: number;
   image?: string;
   title: string;
   options?: OptionType[];
   openAnswer?: string;
};

function RoomTasks({ id }: { id: number }) {
   const token = useAppSelector((store) => store.auth.token);

   const [tasks, setTasks] = useState<TaskType[]>([]);

   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

   const selectedTask =
      tasks.find((task) => task.id === selectedTaskId) || tasks[0];

   useEffect(() => {
      (async () => {
         try {
            const { data: tasks }: { data: TaskType[] } = await backendAPI(
               token
            ).get(`/api/tasks/${id}`);
            setTasks(tasks);
            setSelectedTaskId(tasks[0].id);
            console.log(tasks);
         } catch (error) {
            toast.error(JSON.stringify(error));
         }
      })();
   }, []);
   return (
      <div>
         <div>
            <RoomTask {...selectedTask} />
         </div>
         <ul>
            <Segments
               items={tasks.map((task, i) => ({
                  value: String(task.id),
                  title: String(i + 1)
               }))}
            />
         </ul>
      </div>
   );
}

function RoomTask({ id, image, title, options, openAnswer }: TaskType) {
   const answerType = () => {
      if (openAnswer) {
         return (
            <>
               <TextField.Root />
            </>
         );
      }
      if (options) {
         const optionsNames = options.map((opt) => opt.title);

         return (
            <>
               <OptionCards stringItems={optionsNames} />
            </>
         );
      }
   };

   return (
      <div>
         <h3>{title}</h3>
         {image && (
            <div>
               <ImageWithLoader src={image} />
            </div>
         )}
         {answerType()}
      </div>
   );
}

export default RoomTasks;
