import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { Quest } from "../quest/quest.api";

export interface Room {
   id: number;
   title: string;
   questId: number;
   username: string;
   isActive: boolean;
   quest: Quest;
}

type createRoomParam = {
   questId: number;
   title: string;
};

export const roomApi = createApi({
   reducerPath: "roomApi",
   baseQuery: baseQuery("/api"),
   endpoints: (builder) => ({
      getRoomById: builder.query<Room, number>({
         query: (id) => ({ url: `/room/${id}` })
      }),
      getRoomsByQuestID: builder.query<Room[], number>({
         query: (questId) => ({ url: `/rooms/${questId}` })
      }),

      createRoom: builder.mutation<Room, createRoomParam>({
         query: (body) => ({
            url: `/room/${body.questId}`,
            body: JSON.stringify(body.title),
            method: "POST"
         })
      })
   })
});

export const {
   useGetRoomsByQuestIDQuery,
   useCreateRoomMutation,
   useGetRoomByIdQuery
} = roomApi;
