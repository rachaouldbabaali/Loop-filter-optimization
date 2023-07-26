import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  [key: string]: any;
}

const initialFilterState: FilterState = {};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    setFilter: (
      state: FilterState,
      action: PayloadAction<{ column: string; value: any }>
    ) => {
      const { column, value } = action.payload;
      // Update the filter for the specified column
      state[column] = value;
    },
    clearFilter: (state: FilterState, action: PayloadAction<string>) => {
      const column = action.payload;
      // Clear the filter for the specified column
      delete state[column];
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
