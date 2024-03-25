import { configureStore } from "@reduxjs/toolkit";

import EmployerReducer from "./slices/employer.slice";
import UserReducer from "./slices/user.slice";

const store = configureStore({
  reducer: {
    Employer: EmployerReducer,
    User:UserReducer,
  },
});

export default store;