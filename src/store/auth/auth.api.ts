import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./auth.slice";
import { loginData } from "../../pages/LoginPage";

export const authApi = createApi({
   reducerPath: "authApi",
   baseQuery: fetchBaseQuery({
      baseUrl: "http://13.60.43.26/",
      prepareHeaders: (headers) => {
        // TODO: Remove token and receive it
         const token =
            "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImlkIjoxOCwidXNlcm5hbWUiOiJha2FnYW1pMjIyMiIsInN1YiI6ImFrYWdhbWkyMjIyIiwiaWF0IjoxNzM5MjMxMDUwLCJleHAiOjE3NjM0MjMwNTB9.UkfrD8yLS56o1SZu8NwX0Sa1q8wnmdpvRftOE6R5L1q-Bau2tXpylNjrElQ0DtQ6VZELEBNc2bik3zwR-_HX6w";
         if (token) {
            headers.set("Authorization", `Bearer ${token}`);
         }

         return headers;
      }
   }),
   endpoints: (builder) => ({
      signup: builder.mutation<string, FormData>({
         query: (body) => ({ url: "registration", body, method: "POST" })
      }),
      login: builder.mutation<User, loginData>({
         query: (body) => ({ url: "login", body, method: "POST" })
      }),
      logout: builder.query<string, void>({ query: () => ({ url: "logout" }) }),
      currentUser: builder.query<User, void>({
         query: () => ({ url: "currentAccount" })
      }),
      changeAvatar: builder.mutation<unknown, FormData>({
         query: (body) => ({ url: "user/updateImage", body, method: "PATCH" })
      })
   })
});

export const {
   useCurrentUserQuery,
   useSignupMutation,
   useLoginMutation,
   useLazyLogoutQuery,
   useChangeAvatarMutation
} = authApi;
