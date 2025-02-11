import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from './auth.slice';
import { loginData } from '../../pages/LoginPage';
import { baseQuery } from '../baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation<string, FormData>({
      query: (body) => ({ url: 'registration', body, method: 'POST' }),

      // TEMPORARY SOLUTION FOR THE BACKEND PROBLEM
      transformResponse: (res: unknown) => {
        if ((res as Record<string, string>).message)
          throw new Error('Backender daun');
        return res as string;
      }
    }),
    login: builder.mutation<string, loginData>({
      query: (body) => ({ url: 'login', body, method: 'POST' })
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({ url: 'currentAccount' })
    }),
    logout: builder.query<string, void>({ query: () => ({ url: 'logout' }) }),
    changeAvatar: builder.mutation<unknown, FormData>({
      query: (body) => ({ url: 'user/updateImage', body, method: 'PATCH' })
    })
  })
});

export const {
  useLazyGetCurrentUserQuery,
  useSignupMutation,
  useLoginMutation,
  useLazyLogoutQuery,
  useChangeAvatarMutation
} = authApi;
