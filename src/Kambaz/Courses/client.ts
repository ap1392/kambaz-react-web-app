import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};
export const updateAssignment = async (courseId: string, assignmentId: string, assignment: any) => {
  const response = await axios.put(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`,
    assignment
  );
  return response.data;
};
export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return response.data;
};
export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(
    `${REMOTE_SERVER}/api/users/${userId}/enrollments/${courseId}`
  );
  return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${REMOTE_SERVER}/api/users/${userId}/enrollments/${courseId}`
  );
  return response.data;
};
export const getUserEnrollments = async (userId: string) => {
  const response = await axios.get(
    `${REMOTE_SERVER}/api/users/${userId}/enrollments`
  );
  return response.data;
};
export const findPiazzaFoldersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/pazza/folders`
  );
  return data as string[];
};
export const findPiazzaPostsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/pazza/posts`
  );
  return data as any[];
};
export const findPiazzaPostById = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/pazza/posts/${postId}`
  );
  return data as any;
};
export const createPiazzaPost = async (courseId: string, post: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/pazza/posts`,
    post
  );
  return data;
};
export const addStudentAnswerToPiazzaPost = async (postId: string, answer: any) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/pazza/posts/${postId}/studentAnswers`,
    answer
  );
  return data;
};
export const addInstructorAnswerToPiazzaPost = async (postId: string, answer: any) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/pazza/posts/${postId}/instructorAnswers`,
    answer
  );
  return data;
};
export const addFollowupToPiazzaPost = async (postId: string, followup: any) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/pazza/posts/${postId}/followups`,
    followup
  );
  return data;
};
export const addReplyToPiazzaPostFollowup = async (postId: string, followupId: string, reply: any) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/pazza/posts/${postId}/followups/${followupId}/replies`,
    reply
  );
  return data;
};
export const updatePiazzaPost = async (postId: string, post: any) => {
  const { data } = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/pazza/posts/${postId}`,
    post
  );
  return data;
};
export const deletePiazzaPost = async (postId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/pazza/posts/${postId}`
  );
  return data;
};
export const addPiazzaFolderForCourse = async (courseId: string, name: string) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/pazza/folders`,
    { name }
  );
  return data;
};
export const deletePiazzaFolderFromCourse = async (courseId: string, name: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/pazza/folders/${encodeURIComponent(name)}`
  );
  return data;
};
export const renamePiazzaFolderForCourse = async (courseId: string, oldName: string, newName: string) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/pazza/folders/${encodeURIComponent(oldName)}`,
    { newName }
  );
  return data;
};
