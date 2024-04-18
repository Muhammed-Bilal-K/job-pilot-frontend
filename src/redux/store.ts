import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import employerReducer from "./slices/employer.slice";
import userReducer from "./slices/user.slice";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  employer: employerReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
