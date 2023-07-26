import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataTable: [],
};

export const dataTableSlice = createSlice({
  name: "dataTable",
  initialState,
  reducers: {
    updateDataTable(state, action) {
      state.dataTable = action.payload;
    },
  },
});

export const { updateDataTable } = dataTableSlice.actions;

export default dataTableSlice.reducer;
