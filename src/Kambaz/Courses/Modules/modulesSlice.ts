import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";

const initialState = {
  modules: db.modules
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    }
  }
});

export const { setModules } = modulesSlice.actions;
export default modulesSlice.reducer; 