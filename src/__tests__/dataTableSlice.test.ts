import { updateDataTable } from "../store/slices/dataTableSlice";

describe("dataTableSlice", () => {
  it("should update the data table correctly", () => {
    const payload = [
      {
        number: 1,
        mod3: 1,
        mod5: 1,
        mod15: 1,
        value: "1",
      },
      {
        number: 2,
        mod3: 2,
        mod5: 2,
        mod15: 2,
        value: "2",
      },
    ];
    const action = updateDataTable(payload);
    const state = {
      dataTable: action.payload,
    };
    expect(state).toEqual({
      dataTable: [
        {
          number: 1,
          mod3: 1,
          mod5: 1,
          mod15: 1,
          value: "1",
        },
        {
          number: 2,
          mod3: 2,
          mod5: 2,
          mod15: 2,
          value: "2",
        },
      ],
    });
  });
});
