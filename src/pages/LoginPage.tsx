import { Button, Separator, TextField } from "@radix-ui/themes";
import { useAppSelector } from "../store/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import ErrorFormMessage from "../components/ErrorFormMessage";

const loginScheme = z.object({
   email: z.string().email("Invalid email"),
   password: z
      .string()
      .min(6, "Remember your password — it must be at least 6 characters")
});

type loginData = z.infer<typeof loginScheme>;

const LoginPage = () => {
   // const { user } = useAppSelector((state) => state.auth);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<loginData>({
      resolver: zodResolver(loginScheme)
   });

   const onSubmit = () => {};

   return (
      <div className="container mx-auto p-4">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[450px] mx-auto p-4 flex flex-col gap-3"
         >
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <label>
               <p className="font-bold">Email:</p>
               <TextField.Root {...register("email")} placeholder="Email" />
            </label>
            {errors.email && (
               <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
            )}
            <label>
               <p className="font-bold">Password:</p>
               <TextField.Root
                  {...register("password")}
                  placeholder="Password"
                  type="password"
               />
            </label>
            {errors.password && (
               <ErrorFormMessage>{errors.password.message}</ErrorFormMessage>
            )}
            <Button>Submit</Button>
         </form>
         <div className="max-w-[450px] mx-auto px-4 flex flex-col gap-3">
            <Separator className="!w-full" />
            <h3 className="text-center">Sign in with other providers:</h3>
            <div className="flex gap-2 justify-center">
               <Button color="gray" variant="soft">
                  <p className="pi pi-google"></p>
                  Google
               </Button>
               <Button color="gray" variant="soft">
                  <p className="pi pi-github"></p>
                  Github
               </Button>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
