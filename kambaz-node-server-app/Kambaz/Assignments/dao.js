import Database from "../Database/index.js";

export function findAssignmentsForCourses(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const { assignments } = Database;
  const newAssignment = { ...assignment, _id: new Date().getTime().toString() };
  assignments.push(newAssignment);
  return newAssignment;
} 