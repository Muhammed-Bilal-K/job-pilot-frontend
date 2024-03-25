import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentEmployer: null,
};

const employerSlice = createSlice({
    name: "employer",
    initialState,
    reducers: {
      signInSuccess: (state, action) => {
        state.currentEmployer = action.payload;
      },
      updateUserSuccess: (state, action) => {
        state.currentEmployer = action.payload;
      },
      signOut: (state) => {
        state.currentEmployer = null;
      },
    },
  });


  export const { signInSuccess, updateUserSuccess , signOut } = employerSlice.actions;

  export default employerSlice.reducer;