import React, { useState } from "react";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { Course } from "./Courses/reducer";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { Enrollment } from "./types";
import { User } from "./Account/reducer";
import { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } from "./Courses/enrollmentsReducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const courses = useSelector((state: RootState) => state.coursesReducer.courses);
  const { showAllCourses, enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  
  const [course, setCourse] = useState<Course>({
    _id: "",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description"
  });

  const handleAddCourse = () => {
    const { _id, ...newCourse } = course;
    dispatch(addCourse(newCourse));
    setCourse({
      _id: "",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      description: "New Description"
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = () => {
    if (course._id) {
      dispatch(updateCourse(course));
      setCourse({
        _id: "",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description"
      });
    }
  };

  const handleEnrollmentToggle = (courseId: string) => {
    if (!currentUser) return;

    const isEnrolled = enrollments.some(
      (enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId
    );

    if (isEnrolled) {
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
    }
  };

  const getCourseImage = (courseId: string) => {
    switch (courseId) {
      case "RS101":
        return "/images/Propulsion.png";
      case "RS102":
        return "/images/Aerodynamics.png";
      case "RS103":
        return "/images/SpacecraftDesign.png";
      case "RS104":
        return "/images/OrganicChem.png";
      case "RS105":
        return "/images/InorganicChem.png";
      case "RS106":
        return "/images/PhysicalChem.webp";
      case "RS107":
        return "/images/Elvish.jpg";
      case "RS108":
        return "/images/InterSpecies.png"; 
      default:
        return "/images/theory.jpg";
    }
  };

  const displayedCourses = showAllCourses 
    ? courses 
    : courses;

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button 
          variant="primary" 
          className="me-2"
          onClick={() => dispatch(toggleShowAllCourses())}
        >
          {showAllCourses ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>
      <hr />
      {isFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={handleAddCourse}> Add </button>
          </h5>
          <FormControl 
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl 
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <button 
            className="btn btn-warning float-end me-2"
            id="wd-update-course-click"
            onClick={handleUpdateCourse}
          >
            Update
          </button>
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">Published Courses</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                {enrollments.some(
                  (enrollment) => 
                    enrollment.user === currentUser?._id && 
                    enrollment.course === course._id
                ) ? (
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src={getCourseImage(course._id)}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}{" "}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}{" "}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="primary">Go</Button>
                        <Button 
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnrollmentToggle(course._id);
                          }}
                        >
                          Unenroll
                        </Button>
                      </div>
                      {isFaculty && (
                        <div className="mt-2">
                          <Button 
                            variant="warning" 
                            className="me-2"
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="danger"
                            id="wd-delete-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteCourse(course._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Link>
                ) : (
                  <Card.Body className="card-body">
                    <Card.Img
                      src={getCourseImage(course._id)}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden mt-3">
                      {course.name}{" "}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </Card.Text>
                    <Button 
                      variant="success"
                      onClick={() => handleEnrollmentToggle(course._id)}
                    >
                      Enroll
                    </Button>
                  </Card.Body>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
