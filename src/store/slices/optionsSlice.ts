import { createSlice } from "@reduxjs/toolkit";

interface OptionsState {
  [key: string]: string[];
}

const initialState: OptionsState = {};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setOptions(state, action) {
      const { column, options } = action.payload;
      state[column] = options;
    },
  },
});

export const { setOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
