import CourseNavigation from "./Navigation";
import { useParams, Navigate, Route, Routes, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import People from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const section = pathname.split("/")[4];
  
  const course = useSelector((state: RootState) =>
    state.coursesReducer.courses.find((course) => course._id === cid)
  );

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} {section && `> ${section}`}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="People" element={<People />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
