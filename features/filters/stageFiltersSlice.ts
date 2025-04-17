import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StageFiltersState {
  [key: string]: boolean;
}

const initialState: StageFiltersState = {
  process: true,
  won: true,
  contract: true,
  execution: true,
  payment: true,
  completed: true,
  sentTA: true,
  calculationTA: true,
  executionTA: true,
  completedTA: true,
};

const stageFiltersSlice = createSlice({
  name: 'stageFilters',
  initialState,
  reducers: {
    toggleStage(state, action: PayloadAction<string>) {
      const stage = action.payload;
      state[stage] = !state[stage];
    },
    setStage(state, action: PayloadAction<{ stage: string; value: boolean }>) {
      const { stage, value } = action.payload;
      state[stage] = value;
    },
    setAllStages(state, action: PayloadAction<StageFiltersState>) {
      return { ...action.payload };
    },
  },
});

export const { toggleStage, setStage, setAllStages } = stageFiltersSlice.actions;
export default stageFiltersSlice.reducer;
