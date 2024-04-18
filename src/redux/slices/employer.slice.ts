import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployerState {
  currentEmployer: any; 
}

const initialState: EmployerState = {
  currentEmployer: null,
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.currentEmployer = action.payload;
    },
    updateImage: (state, action: PayloadAction<any>) => {
      state.currentEmployer = action.payload;
    },
  },
});

export const { signInSuccess , updateImage } = employerSlice.actions;
export default employerSlice.reducer;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface EmployerState {
//   currentEmployer: any;
// }

// const initialState: EmployerState = {
//   currentEmployer: null,
// };

// const employerSlice = createSlice({
//   name: "employer",
//   initialState,
//   reducers: {
//     signInSuccess: (state, action: PayloadAction<any>) => {
//       state.currentEmployer = {
//         ...state.currentEmployer,
//         ...action.payload,
//       };
//     },
//     updateImage: (state, action: PayloadAction<any>) => {
//       state.currentEmployer = {
//         ...state.currentEmployer,
//         ...action.payload,
//       };
//     },
//   },
// });

// export const { signInSuccess, updateImage } = employerSlice.actions;
// export default employerSlice.reducer;
