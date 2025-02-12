import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorFormMessage from "../../components/ErrorFormMessage";
import { backendAPI, routes } from "../../configs/routes";
import { useAppSelector } from "../../store/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const roomScheme = z.object({
   title: z
      .string()
      .nonempty("Provide room name")
      .max(15, "Name must be less than 15 characters")
});

type roomData = z.infer<typeof roomScheme>;

function CreateRoomForm({ id }: { id: number }) {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<roomData>({
      resolver: zodResolver(roomScheme)
   });

   const token = useAppSelector((store) => store.auth.token);

   const navigate = useNavigate();

   const onSubmit = async ({ title }: roomData) => {
      try {
         const { data } = await backendAPI(token).post(
            `/api/room/${id}`,
            title
         );
         console.log(title);
         navigate(routes.toRoom(data.id));
      } catch (error) {
         toast.error(JSON.stringify(error));
      }
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
               <Button variant="soft" color="gray">
                  Cancel
               </Button>
            </Dialog.Close>
            <Button loading={isSubmitting}>Submit</Button>
         </div>
      </form>
   );
}

export default CreateRoomForm;
