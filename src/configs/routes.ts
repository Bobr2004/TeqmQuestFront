import axios from "axios";

export const routes = {
   home: "/",

   login: "/login",
   signup: "/signup",
   settings: "/settings",

   editQuests: "/edit-quests",
   toEditQuest: (id: string) => `/edit-quests/${id}`,

   quest: "quest/:id",
   toQuest: (id: string) => `/quest/${id}`,

   room: "room/:id",
   toRoom: (id: string) => `/room/${id}`
};

export const backendAPI = (token: string | null) =>
   axios.create({
      baseURL: "http://ec2-13-60-43-26.eu-north-1.compute.amazonaws.com",
      headers: {
         Authorization: `Bearer ${token}`
      }
   });
