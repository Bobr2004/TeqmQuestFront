import { Button, Separator, TextField } from "@radix-ui/themes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import ErrorFormMessage from "../components/ErrorFormMessage";
import { useSignupMutation } from "../store/auth/auth.api";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/auth/auth.slice";
import { useNavigate } from "react-router";
import { routes } from "./routes";

const signUpScheme = z
   .object({
      username: z
         .string()
         .nonempty("Username is not specified")
         .max(20, "Username must be less than 20 characters"),
      email: z
         .string()
         .nonempty("Email is not specified")
         .email("Invalid email"),
      password: z
         .string()
         .nonempty("Password is not specified")
         .min(8, "Password must be at least 8 characters"),
      repeatPassword: z.string().nonempty("Please repeat your password"),
      image: z.string().optional()
   })
   .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"]
   });

type signUpData = z.infer<typeof signUpScheme>;

const SignUpPage = () => {
   const [signup, { isLoading }] = useSignupMutation();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<signUpData>({
      resolver: zodResolver(signUpScheme)
   });

   const onSubmit: SubmitHandler<signUpData> = ({
      repeatPassword,
      image,
      ...data
   }) => {
      if (!isSubmitting && !isLoading) {
         const fd = new FormData();
         fd.append("user", JSON.stringify(data));
         if (image) fd.append("image", image);

         signup(fd)
            .unwrap()
            .then((token) => {
               // TODO: Refetch current user
               localStorage.setItem("token", token);
               navigate(routes.home, { replace: true });
            })
            .catch(console.log);
      }
   };

   return (
      <section className="container mx-auto p-4">
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
            {errors.username && (
               <ErrorFormMessage>{errors.username.message}</ErrorFormMessage>
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
                  {...register("repeatPassword")}
                  placeholder="Password"
                  type="password"
               />
            </label>
            {errors.repeatPassword && (
               <ErrorFormMessage>
                  {errors.repeatPassword.message}
               </ErrorFormMessage>
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
      </section>
   );
};

export default SignUpPage;
