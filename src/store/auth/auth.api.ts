import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from './auth.slice';
import { loginData } from '../../pages/LoginPage';
import { baseQuery } from '../baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery('/'),
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
    deleteAccount: builder.mutation<void, void>({
      query: () => ({ url: 'user/delete', method: 'DELETE' })
    }),
    changeAvatar: builder.mutation<unknown, FormData>({
      query: (body) => ({ url: 'user/updateImage', body, method: 'PATCH' })
    }),
    oauthGoogle: builder.query<void, void>({
      query: () => ({ url: 'oauth2/authorization/google' })
    }),
    oauthGithub: builder.query<void, void>({
      query: () => ({ url: 'oauth2/authorization/github' })
    })
  })
});

export const {
  useLazyGetCurrentUserQuery,
  useSignupMutation,
  useLoginMutation,
  useDeleteAccountMutation,
  useChangeAvatarMutation,
  useLazyOauthGoogleQuery,
  useLazyOauthGithubQuery
} = authApi;
