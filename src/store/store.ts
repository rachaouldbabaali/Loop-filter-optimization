import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import filter from "./slices/filterSlice";
import options from "./slices/optionsSlice";
import tableDataReducer from "./slices/dataTableSlice";

const rootReducer = combineReducers({
  filter: filter,
  options: options,
  data: tableDataReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
