import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sum: 0
};

const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    add: (state, action) => {
      const { a, b } = action.payload;
      state.sum = a + b;
    },
  },
});

export const { add } = addSlice.actions;
export default addSlice.reducer;