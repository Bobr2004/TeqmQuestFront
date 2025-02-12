import { useEffect } from "react";
import { backendAPI } from "../../configs/routes";
import { useAppSelector } from "../../store/store";
import toast from "react-hot-toast";
import ImageWithLoader from "../../components/ImageWithLoader";
import { TextField } from "@radix-ui/themes";
import OptionCards from "../../components/ui/OptionCards";

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
   useEffect(() => {
      (async () => {
         try {
            const { data: tasks }: { data: TaskType[] } = await backendAPI(
               token
            ).get(`/api/tasks/${id}`);
            console.log(tasks);
         } catch (error) {
            toast.error(JSON.stringify(error));
         }
      })();
   }, []);
   return <div>RoomTasks</div>;
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

         return <>
            <OptionCards stringItems={optionsNames}/>
         </>;
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
