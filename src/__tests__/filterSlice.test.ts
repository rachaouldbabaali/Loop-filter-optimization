import { setFilter, clearFilter } from "../store/slices/filterSlice";

describe("filterSlice", () => {
  it("should set the filter correctly", () => {
    const payload = {
      column: "number",
      value: 1,
    };
    const action = setFilter(payload);
    const state = {
      filter: action.payload,
    };
    expect(state).toEqual({
      filter: {
        column: "number",
        value: 1,
      },
    });
  });
  it("should clear the filter correctly", () => {
    const payload = "mod3";
    const action = clearFilter(payload);
    const state = {
      filter: action.payload,
    };
    expect(state).toEqual({
      filter: "mod3",
    });
  });
});
