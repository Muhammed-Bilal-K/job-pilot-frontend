import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      LoginInSuccess: (state, action) => {
        state.currentUser = action.payload;
      },
    },
  });


  export const { LoginInSuccess } = userSlice.actions;

  export default userSlice.reducer;