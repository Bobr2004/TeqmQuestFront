import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './auth.slice';
import { loginData } from '../../pages/LoginPage';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://13.60.43.26/' }),
  endpoints: (builder) => ({
    signup: builder.mutation<User, FormData>({
      query: (body) => ({ url: 'registration', body, method: 'POST' })
    }),
    login: builder.mutation<User, loginData>({
      query: (body) => ({ url: 'login', body, method: 'POST' })
    }),
    logout: builder.query<string, void>({ query: () => ({ url: 'logout' }) })
  })
});

export const { useSignupMutation, useLoginMutation, useLazyLogoutQuery } =
  authApi;
