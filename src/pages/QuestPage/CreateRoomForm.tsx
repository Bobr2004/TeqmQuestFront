import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextField } from "@radix-ui/themes";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorFormMessage from "../../components/ErrorFormMessage";

const roomScheme = z.object({
   title: z
      .string()
      .nonempty("Provide room name")
      .max(15, "Name must be less than 15 characters")
});

type roomData = z.infer<typeof roomScheme>;

function CreateRoomForm() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<roomData>({
      resolver: zodResolver(roomScheme)
   });

   const closeButtonRef = useRef<HTMLButtonElement | null>(null);

   const closeModal = () => {
      closeButtonRef.current && closeButtonRef.current.click();
   };

   const onSubmit = async () => {
      closeModal()
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
         <Dialog.Title className="text-2xl font-bold text-center">
            Create new room
         </Dialog.Title>
         <label className="-mt-3">
            <p className="font-bold">Name:</p>
            <TextField.Root {...register("title")} placeholder="Mega room" />
         </label>
         {errors.title && (
            <ErrorFormMessage>{errors.title.message}</ErrorFormMessage>
         )}
         <div className="flex justify-center gap-3 ">
            <Dialog.Close>
               <Button variant="soft" color="gray" ref={closeButtonRef}>
                  Cancel
               </Button>
            </Dialog.Close>
            <Button loading={isSubmitting}>Submit</Button>
         </div>
      </form>
   );
}

export default CreateRoomForm;
