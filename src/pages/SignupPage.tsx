import { Button, Separator, TextField } from "@radix-ui/themes";
import { useAppSelector } from "../store/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import ErrorFormMessage from "../components/ErrorFormMessage";

const signUpScheme = z.object({
   username: z.string().max(20, "Username must be less than 20 characters"),
   email: z.string().email("Invalid email"),
   password: z.string().min(6, "Password must be at least 6 characters")
});

type signUpData = z.infer<typeof signUpScheme>;

const SignUpPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<signUpData>({
      resolver: zodResolver(signUpScheme)
   });

   const onSubmit = () => {};

   return (
      <div className="container mx-auto p-4">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[450px] mx-auto p-4 flex flex-col gap-3"
         >
            <h2 className="text-2xl font-bold text-center">Sign up</h2>
            <label>
               <p className="font-bold">Username:</p>
               <TextField.Root
                  {...register("username")}
                  placeholder="Username"
               />
            </label>
            {errors.email && (
               <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
            )}
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
            <label>
               <p className="font-bold">Repeat Password:</p>
               <TextField.Root
                  {...register("password")}
                  placeholder="Password"
                  type="password"
               />
            </label>
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

export default SignUpPage;
