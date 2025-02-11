import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

interface Quest {
  id: number;
  // other stuff from backend
}

export const questApi = createApi({
  reducerPath: 'questApi',
  baseQuery,
  endpoints: (builder) => ({
    createQuest: builder.mutation<Quest, FormData>({
      query: (body) => ({ url: 'new-quest', body, method: 'POST' })
    }),
    addTask: builder.mutation<unknown, { questId: number; body: FormData }>({
      query: ({ questId, body }) => ({
        url: `${questId}/add-task`,
        body,
        method: 'PATCH'
      })
    }),
    removeTask: builder.mutation<unknown, { questId: number; taskId: number }>({
      query: ({ questId, taskId }) => ({
        url: `${questId}/remove-task`,
        body: { taskId },
        method: 'DELETE'
      })
    })
  })
});

export const {
  useCreateQuestMutation,
  useAddTaskMutation,
  useRemoveTaskMutation
} = questApi;
