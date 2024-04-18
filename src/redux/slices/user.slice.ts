import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  currentUser : any
}

const initialState : UserState= {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      LoginInSuccess: (state, action : PayloadAction<any>) => {
        state.currentUser = action.payload;
      },
    },
  });


  export const { LoginInSuccess } = userSlice.actions;

  export default userSlice.reducer;