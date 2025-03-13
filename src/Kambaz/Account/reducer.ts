import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
  currentUser: null
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: { payload: User | null }) => {
      state.currentUser = payload;
    }
  }
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer; 