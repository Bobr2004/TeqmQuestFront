import { Button, Separator, TextField } from "@radix-ui/themes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import ErrorFormMessage from "../components/ErrorFormMessage";
import { useLoginMutation } from "../store/auth/auth.api";
import { useAppDispatch } from "../store/store";
import { setToken } from "../store/auth/auth.slice";
import { useNavigate } from "react-router";
import { routes } from "../configs/routes";

const loginScheme = z.object({
   login: z.string().nonempty("Username is not specified"),
   password: z
      .string()
      .nonempty("Password is not specified")
      .min(8, "Remember your password — it must be at least 8 characters")
});

export type loginData = z.infer<typeof loginScheme>;

const LoginPage = () => {
   const [login, { isLoading }] = useLoginMutation();

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<loginData>({
      resolver: zodResolver(loginScheme)
   });

   const onSubmit: SubmitHandler<loginData> = (data) => {
      if (!isSubmitting && !isLoading) {
         login(data)
            .unwrap()
            .then((token) => {
               dispatch(setToken(token));
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
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <label>
               <p className="font-bold">Username:</p>
               <TextField.Root {...register("login")} placeholder="Username" />
            </label>
            {errors.login && (
               <ErrorFormMessage>{errors.login.message}</ErrorFormMessage>
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
               <a href="http://ec2-13-60-43-26.eu-north-1.compute.amazonaws.com/oauth2/authorization/google">
                  <Button variant="soft" color="gray">
                     Google <i className="pi pi-google"></i>
                  </Button>
               </a>
               <a href="http://ec2-13-60-43-26.eu-north-1.compute.amazonaws.com/oauth2/authorization/github">
                  <Button variant="soft" color="gray">
                     Github <i className="pi pi-github"></i>
                  </Button>
               </a>
            </div>
         </div>
      </section>
   );
};

export default LoginPage;
