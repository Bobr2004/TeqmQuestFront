import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (builder) => ({
    signup: builder.query<void, FormData>({
      query: (body) => ({ url: 'registration', body })
    })
  })
});
