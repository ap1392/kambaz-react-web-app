import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";
import { Assignment } from "./types";

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: db.assignments as Assignment[]
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: { payload: Omit<Assignment, '_id'> }) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        ...payload
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload }: { payload: Assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a
      );
    }
  }
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer; 