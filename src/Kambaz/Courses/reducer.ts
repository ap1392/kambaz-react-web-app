import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: db.courses as Course[]
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload }: { payload: Omit<Course, '_id'> }) => {
      const newCourse: Course = {
        _id: uuidv4(),
        ...payload
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload }: { payload: Course }) => {
      state.courses = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );
    }
  }
});

export const { addCourse, deleteCourse, updateCourse } = courseSlice.actions;
export default courseSlice.reducer; 