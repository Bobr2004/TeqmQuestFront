import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextArea, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorFormMessage from "../../components/ErrorFormMessage";
// import { useCreateQuestMutation } from "../../store/quest/quest.api";
import { useNavigate } from "react-router";
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { routes } from "../routes";

const questScheme = z.object({
   name: z.string().nonempty("Provide quest name"),
   description: z.string().nonempty("Provide quest description"),
   time: z.number().optional()
});

type LocalStorageQuest = {
   id: string;
   name: string;
   description: string;
   time: number | null;
};

export type questData = z.infer<typeof questScheme>;

function wait(seconds: number) {
   return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
   });
}

const NewQuest = () => {
   //  const [createQuest, { isLoading }] = useCreateQuestMutation();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors, isSubmitting }
   } = useForm<questData>({
      resolver: zodResolver(questScheme)
   });

   const onSubmit: SubmitHandler<questData> = async ({
      name,
      description,
      time
   }) => {
      const localQuestsString = localStorage.getItem("localQuests");
      let localQuests: LocalStorageQuest[] = [];
      if (localQuestsString) localQuests = JSON.parse(localQuestsString);

      const questToSave = {
         id: v4(),
         name,
         description,
         time: time || null
      };

      localStorage.setItem(
         "localQuests",
         JSON.stringify([...localQuests, questToSave])
      );

      await wait(0.5);

      navigate(routes.editQuests);

      toast.success("Quest is created");

      // if (!isSubmitting && !isLoading) {
      //    const fd = new FormData();
      //    fd.append("name", data.name);
      //    fd.append("description", data.description);
      //    if (data.time) fd.append("time", data.time.toString());

      //    createQuest(fd)
      //       .unwrap()
      //       .then((quest) => navigate(`/edit-quest/${quest.id}`))
      //       .catch(console.log);
      // }
   };

   return (
      <div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[450px] mx-auto flex flex-col gap-3"
         >
            <Dialog.Title className="text-2xl font-bold text-center">
               Create new quest
            </Dialog.Title>
            <label>
               <p className="font-bold">Name:</p>
               <TextField.Root {...register("name")} placeholder="Mega test" />
            </label>
            {errors.name && (
               <ErrorFormMessage>{errors.name.message}</ErrorFormMessage>
            )}

            <label>
               <p className="font-bold">Description:</p>
               <TextArea
                  {...register("description")}
                  placeholder="Description"
               />
            </label>
            {errors.description && (
               <ErrorFormMessage>{errors.description.message}</ErrorFormMessage>
            )}

            <label>
               <p className="font-bold">Time Limit (in minutes):</p>
               <TextField.Root
                  type="number"
                  {...register("time", {
                     setValueAs: (value) => Number(value)
                  })}
                  placeholder="10"
               />
            </label>
            {errors.time && (
               <ErrorFormMessage>{getValues("time")}</ErrorFormMessage>
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
};

export default NewQuest;
