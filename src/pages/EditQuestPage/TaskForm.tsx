import { Button, Checkbox, Dialog, TextField } from "@radix-ui/themes";
import Segments from "../../components/ui/Segments";
import { useState } from "react";
import ImageInput from "../../components/ImageInput";

type TaskFormProps = {
   addNewTask: (task: any) => void;
};

function TaskForm({ addNewTask }: TaskFormProps) {
   const [taskTitle, setTaskTitle] = useState("");

   const [image, setImage] = useState<File | null>(null);

   const [openAnswer, setOpenAnswer] = useState("");
   const [taskMode, setTaskMode] = useState<"Open answer" | "Options">(
      "Options"
   );

   const [options, setOptions] = useState([
      {
         id: 1,
         text: "",
         isTrue: true
      },
      {
         id: 2,
         text: "",
         isTrue: false
      },
      {
         id: 3,
         text: "",
         isTrue: false
      },
      {
         id: 4,
         text: "",
         isTrue: false
      }
   ]);

   const changeOptionText = (optionId: number) => (value: string) => {
      setOptions((opts) =>
         opts.map((opt) =>
            opt.id === optionId ? { ...opt, text: value } : { ...opt }
         )
      );
   };

   const getOptionText = (optionId: number) =>
      options.find((opt) => opt.id === optionId)?.text;

   const changeOptionIsTrue = (optionId: number) => {
      setOptions((opts) =>
         opts.map((opt) =>
            opt.id === optionId
               ? { ...opt, isTrue: true }
               : { ...opt, isTrue: false }
         )
      );
   };
   const getOptionIsTrue = (optionId: number) =>
      options.find((opt) => opt.id === optionId)?.isTrue;

   const submit = () => {
      let taskToSubmit: any;
      if (taskMode === "Open answer") {
         taskToSubmit = {
            id: new Date().getTime(),
            title: taskTitle,
            image,
            openAnswer
         };
      }
      if (taskMode === "Options") {
         taskToSubmit = {
            id: new Date().getTime(),
            title: taskTitle,
            image,
            options: options.map(({ id, ...other }) => other)
         };
      }
      addNewTask(taskToSubmit);
   };

   return (
      <div>
         <form
            className="max-w-[450px] mx-auto flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
         >
            <Dialog.Title className="text-2xl font-bold text-center">
               Add task
            </Dialog.Title>
            <label>
               <p className="font-bold">Task name:</p>
               <TextField.Root
                  value={taskTitle}
                  onChange={({ target }) => setTaskTitle(target.value)}
                  placeholder="Who was second president of Ukraine?"
               />
            </label>
            <ImageInput setImageState={setImage} />
            <div>
               <Segments
                  stringItems={["Open answer", "Options"]}
                  value={taskMode}
                  onValueChange={setTaskMode}
               />
            </div>
            {taskMode === "Open answer" && (
               <label>
                  <p className="font-bold">Answer:</p>
                  <TextField.Root
                     value={openAnswer}
                     onChange={({ target }) => setOpenAnswer(target.value)}
                     placeholder="Donald Trump"
                  />
               </label>
            )}
            {taskMode === "Options" && (
               <div className="flex flex-col gap-3">
                  {options.map((option) => (
                     <label key={option.id}>
                        <div className="flex items-center gap-2">
                           <p className="font-bold">Option {option.id}:</p>
                           <Checkbox
                              checked={getOptionIsTrue(option.id)}
                              onCheckedChange={() =>
                                 changeOptionIsTrue(option.id)
                              }
                           />
                        </div>
                        <TextField.Root
                           value={getOptionText(option.id)}
                           onChange={({ target }) =>
                              changeOptionText(option.id)(target.value)
                           }
                           placeholder="Volodimir Zelensky"
                        />
                     </label>
                  ))}
               </div>
            )}
            <div className="flex justify-center gap-3 ">
               <Dialog.Close>
                  <Button variant="soft" color="gray">
                     Cancel
                  </Button>
               </Dialog.Close>
               <Button onClick={submit}>Submit</Button>
            </div>
         </form>
      </div>
   );
}

export default TaskForm;
