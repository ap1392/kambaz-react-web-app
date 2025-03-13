import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";
import { Enrollment } from "../types";

interface EnrollmentsState {
  enrollments: Enrollment[];
  showAllCourses: boolean;
}

const initialState: EnrollmentsState = {
  enrollments: db.enrollments as Enrollment[],
  showAllCourses: false
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollInCourse: (state, { payload }: { payload: { userId: string; courseId: string } }) => {
      const newEnrollment: Enrollment = {
        _id: uuidv4(),
        user: payload.userId,
        course: payload.courseId
      };
      state.enrollments.push(newEnrollment);
    },
    unenrollFromCourse: (state, { payload }: { payload: { userId: string; courseId: string } }) => {
      state.enrollments = state.enrollments.filter(
        enrollment => !(enrollment.user === payload.userId && enrollment.course === payload.courseId)
      );
    }
  }
});

export const { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer; 