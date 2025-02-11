import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export interface Quest {
  id: number;
  title: string;
  description: string;
  timeLimit: string;
  userId: number;
  image?: string;
  rating: number;
}

export const questApi = createApi({
  reducerPath: 'questApi',
  baseQuery: baseQuery('/api/quests'),
  endpoints: (builder) => ({
    getAllQuests: builder.query<Quest[], void>({
      query: () => ({ url: "" })
    }),
    getQuestById: builder.query<Quest, number>({
      query: (questId) => ({ url: `/${questId}` })
    }),
    deleteQuestById: builder.mutation<void, number>({
      query: (questId) => ({ url: `/${questId}`, method: 'DELETE' })
    }),
    createQuest: builder.mutation<Quest, FormData>({
      query: (body) => ({ url: '/', body, method: 'POST' })
    })
  })
});

export const {
  useDeleteQuestByIdMutation,
  useGetAllQuestsQuery,
  useGetQuestByIdQuery,
  useCreateQuestMutation
} = questApi;
