import { Button, Checkbox, Dialog, TextField } from "@radix-ui/themes";
import { z } from "zod";
import ErrorFormMessage from "../../components/ErrorFormMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Segments from "../../components/ui/Segments";
import { useState } from "react";

const taskScheme = z.object({
   taskName: z.string().nonempty("Provide task name"),
   media: z.string(),
   openAnswer: z.string().nonempty("Provide open answer"),
   optionA: z
      .string()
      .nonempty("Provide option A")
      .max(20, "Option must be less than 20 characters"),
   optionB: z
      .string()
      .nonempty("Provide option B")
      .max(20, "Option must be less than 20 characters"),
   optionC: z
      .string()
      .nonempty("Provide option C")
      .max(20, "Option must be less than 20 characters"),
   optionD: z
      .string()
      .nonempty("Provide option D")
      .max(20, "Option must be less than 20 characters")
});

type taskData = z.infer<typeof taskScheme>;

function TaskForm() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<taskData>({
      resolver: zodResolver(taskScheme)
   });

   const onSubmit: SubmitHandler<taskData> = async () => {};

   const [taskMode, setTaskMode] = useState<"Open answer" | "Options">(
      "Options"
   );

   return (
      <div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[450px] mx-auto flex flex-col gap-3"
         >
            <Dialog.Title className="text-2xl font-bold text-center">
               Add task
            </Dialog.Title>
            <label>
               <p className="font-bold">Task name:</p>
               <TextField.Root
                  {...register("taskName")}
                  placeholder="Who was second president of Ukraine?"
               />
            </label>
            {errors.taskName && (
               <ErrorFormMessage>{errors.taskName.message}</ErrorFormMessage>
            )}
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
                     {...register("openAnswer")}
                     placeholder="Donald Trump"
                  />
               </label>
            )}
            {taskMode === "Options" && (
               <div className="flex flex-col gap-3">
                  <label>
                     <div className="flex items-center gap-2">
                        <p className="font-bold">Option A:</p>
                        <Checkbox />
                     </div>
                     <TextField.Root
                        {...register("optionA")}
                        placeholder="Volodimir Zelensky"
                     />
                  </label>
                  <label>
                     <div className="flex items-center gap-2">
                        <p className="font-bold">Option A:</p>
                        <Checkbox />
                     </div>
                     <TextField.Root
                        {...register("optionA")}
                        placeholder="Volodimir Zelensky"
                     />
                  </label>
                  <label>
                     <div className="flex items-center gap-2">
                        <p className="font-bold">Option A:</p>
                        <Checkbox />
                     </div>
                     <TextField.Root
                        {...register("optionA")}
                        placeholder="Volodimir Zelensky"
                     />
                  </label>
                  <label>
                     <div className="flex items-center gap-2">
                        <p className="font-bold">Option A:</p>
                        <Checkbox />
                     </div>
                     <TextField.Root
                        {...register("optionA")}
                        placeholder="Volodimir Zelensky"
                     />
                  </label>
               </div>
            )}
            <div className="flex justify-center gap-3 ">
               <Dialog.Close>
                  <Button variant="soft" color="gray">
                     Cancel
                  </Button>
               </Dialog.Close>
               <Button loading={isSubmitting}>Submit</Button>
            </div>
         </form>
      </div>
   );
}

export default TaskForm;
