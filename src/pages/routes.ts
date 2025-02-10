const routes = {
   home: "/",
   login: "/login",
   signup: "/signup",
   settings: "/settings",
   editQuests: "/edit-quests",
   toEditQuest: (id: number) => `/edit-quests/${id}`
};

export { routes };
