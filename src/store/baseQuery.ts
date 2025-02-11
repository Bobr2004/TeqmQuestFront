import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from './store';

export const baseQuery = (basePath: string) =>
  fetchBaseQuery({
    baseUrl: `http://ec2-13-60-43-26.eu-north-1.compute.amazonaws.com${basePath}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    responseHandler: async (response) => {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }
  });
