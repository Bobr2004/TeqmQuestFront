import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export interface Room {
  id: number;
  title: string;
  questId: number;
  username: string;
  isActive: boolean;
}

type createRoomParam = {
  questId: number;
  title: string;
};

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: baseQuery('/api/rooms'),
  endpoints: (builder) => ({
    getRoomsByQuestID: builder.query<Room[], number>({
      query: (questId) => ({ url: `/${questId}` })
    }),

    createRoom: builder.mutation<Room, createRoomParam>({
      query: (body) => ({
        url: `/${body.questId}`,
        body: JSON.stringify(body.title),
        method: 'POST'
      })
    })
  })
});

export const { useGetRoomsByQuestIDQuery, useCreateRoomMutation } = roomApi;
