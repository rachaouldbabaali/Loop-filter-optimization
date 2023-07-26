import { setOptions } from "../store/slices/optionsSlice";

describe("optionsSlice", () => {
  it("should set the options correctly", () => {
    const payload = {
      column: "number",
      options: [1, 2, 3],
    };
    const action = setOptions(payload);
    const state = {
      options: action.payload,
    };
    expect(state).toEqual({
      options: {
        column: "number",
        options: [1, 2, 3],
      },
    });
  });
});
