import Database from "../Database/index.js";

export function findAssignmentsForCourses(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
} 