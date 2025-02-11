export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  settings: '/settings',
  editQuests: '/edit-quests',
  toEditQuest: (id: string) => `/edit-quests/${id}`,
  toQuest: (id: string) => `/quest/${id}`
};
