import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quest } from './quest.api';

interface QuestState {
  quests: Quest[];
}

const initialState: QuestState = { quests: [] };

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    addQuest: (state, action: PayloadAction<Quest>) => {
      state.quests.push(action.payload);
    },
    deleteQuestById: (state, action: PayloadAction<number>) => {
      state.quests = state.quests.filter((q) => q.id !== action.payload);
    },
    clearQuestCache: (state) => {
      state.quests = [];
    }
  }
});

export const { addQuest, deleteQuestById, clearQuestCache } =
  questSlice.actions;
export default questSlice.reducer;
