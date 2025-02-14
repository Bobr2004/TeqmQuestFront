import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export interface IComment {
  id: number;
  title: string;
  userDTO: {
    username: string;
    id: number;
    image: string;
  };
}

interface SendCommentData {
  title: string;
  questId: number;
}

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: baseQuery('/api/comments'),
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getQuestComments: builder.query<IComment[], number>({
      query: (questId) => ({ url: `/${questId}` }),
      providesTags: ['comments']
    }),
    addComment: builder.mutation<void, SendCommentData>({
      query: (body) => ({ url: '', body, method: 'POST' }),
      invalidatesTags: ['comments']
    }),
    deleteCommentById: builder.mutation<void, number>({
      query: (commentId) => ({ url: `/${commentId}`, method: 'DELETE' }),
      invalidatesTags: ['comments']
    }),
    updateCommentById: builder.mutation<void, SendCommentData>({
      query: (body) => ({ url: '/', body, method: 'PUT' }),
      invalidatesTags: ['comments']
    })
  })
});

export const {
  useGetQuestCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentByIdMutation,
  useDeleteCommentByIdMutation
} = commentApi;
