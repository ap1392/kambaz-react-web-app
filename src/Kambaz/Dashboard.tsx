import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { Course } from "./Courses/reducer";
import { addCourse, deleteCourse, updateCourse as updateCourseAction } from "./Courses/reducer";
import { Enrollment } from "./types";
import { User } from "./Account/reducer";
import { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } from "./Courses/enrollmentsReducer";
import { createCourse, enrollIntoCourse, unenrollFromCourse as unenrollFromAccountClient, findCoursesForUser } from "./Account/client";
import { 
  fetchAllCourses, 
  deleteCourse as deleteServerCourse, 
  updateCourse as updateServerCourse,
} from "./Courses/client";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const { showAllCourses, enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  
  useEffect(() => {
    if (currentUser?.role === "FACULTY") {
      findCoursesForUser(currentUser._id)
        .then((courses) => {
          setMyCourses(courses);
        })
        .catch((error) => {
          console.error("Failed to fetch my courses:", error);
        });
    }

    fetchAllCourses()
      .then((courses) => {
        setAllCourses(courses);
      })
      .catch((error) => {
        console.error("Failed to fetch all courses:", error);
      });
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      console.log("[Dashboard Load] Fetching enrolled courses for user:", currentUser._id);
      findCoursesForUser(currentUser._id)
        .then((enrolledCourses: Course[]) => {
          console.log("[Dashboard Load] Received enrolled courses from API:", enrolledCourses);
          enrolledCourses.forEach((course) => {
            const enrollmentData = { userId: currentUser._id, courseId: course._id };
            console.log("[Dashboard Load] Checking Redux state for:", enrollmentData, "Current Redux enrollments:", enrollments);
            if (!enrollments.some(e => e.user === currentUser._id && e.course === course._id)) {
              console.log("[Dashboard Load] Dispatching enrollInCourse for:", enrollmentData);
              dispatch(enrollInCourse(enrollmentData));
            }
          });
        })
        .catch((error) => {
          console.error("Failed to fetch enrolled courses:", error);
        });
    }
  }, [currentUser, dispatch, enrollments]);

  const [course, setCourse] = useState<Course>({
    _id: "",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description"
  });

  const handleAddCourse = async () => {
    const { _id, ...newCourse } = course;
    try {
      const createdCourse = await createCourse(newCourse);
      dispatch(addCourse(createdCourse));
      setMyCourses([...myCourses, createdCourse]);
      setCourse({
        _id: "",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description"
      });
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteServerCourse(courseId);
      dispatch(deleteCourse(courseId));
      setMyCourses(myCourses.filter(course => course._id !== courseId));
      setAllCourses(allCourses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    if (course._id) {
      try {
        const updatedCourse = await updateServerCourse(course);
        dispatch(updateCourseAction(updatedCourse));
        setMyCourses(myCourses.map(c => c._id === updatedCourse._id ? updatedCourse : c));
        setAllCourses(allCourses.map(c => c._id === updatedCourse._id ? updatedCourse : c));
        setCourse({
          _id: "",
          name: "New Course",
          number: "New Number",
          startDate: "2023-09-10",
          endDate: "2023-12-15",
          description: "New Description"
        });
      } catch (error) {
        console.error("Failed to update course:", error);
      }
    }
  };

  const handleEnrollmentToggle = async (courseId: string) => {
    if (!currentUser) return;

    const isEnrolled = enrollments.some(
      (enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId
    );

    try {
      if (isEnrolled) {
        await unenrollFromAccountClient(currentUser._id, courseId);
        dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
      } else {
        const enrollment = await enrollIntoCourse(currentUser._id, courseId);
        dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
      }
    } catch (error) {
      console.error("Failed to toggle enrollment:", error);
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

  const getDisplayedCourses = () => {
    console.log("[Display Logic] getDisplayedCourses called. showAllCourses:", showAllCourses);
    if (showAllCourses) {
      console.log("[Display Logic] Returning allCourses:", allCourses);
      return allCourses;
    } else {
      if (!currentUser) {
        console.log("[Display Logic] No current user, returning empty array.");
        return [];
      }
      console.log("[Display Logic] Filtering based on Redux enrollments:", enrollments);
      const enrolledCourseIds = new Set(
        enrollments
          .filter((enrollment) => enrollment.user === currentUser._id)
          .map((enrollment) => enrollment.course)
      );
      console.log("[Display Logic] Constructed enrolledCourseIds Set:", enrolledCourseIds);
      const filteredCourses = allCourses.filter((c) => enrolledCourseIds.has(c._id));
      console.log("[Display Logic] Returning filtered 'My Enrolled Courses':", filteredCourses);
      return filteredCourses;
    }
  };

  const displayedCourses = getDisplayedCourses();

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <div>
          <Button 
            variant="primary" 
            className="me-2"
            onClick={() => dispatch(toggleShowAllCourses())}
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </Button>
          <Button 
            variant="secondary" 
            className="me-2"
            onClick={() => setEnrolling(!enrolling)}
          >
            {enrolling ? "Disable Enrollment Actions" : "Enable Enrollment Actions"}
          </Button>
        </div>
      </div>
      <hr />
      {isFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={handleAddCourse}> Add </button>
            <button 
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={handleUpdateCourse}
              disabled={!course._id}
            >
              Update
            </button>
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
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">{showAllCourses ? "All Courses" : "My Enrolled Courses"}</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((displayCourse: Course) => {
            const isEnrolled = currentUser ? enrollments.some(
              (enrollment) => 
                enrollment.user === currentUser._id && 
                enrollment.course === displayCourse._id
            ) : false;

            return (
              <Col key={displayCourse._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                {isEnrolled ? (
                  <Link
                    to={`/Kambaz/Courses/${displayCourse._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src={getCourseImage(displayCourse._id)}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {displayCourse.name}{" "}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {displayCourse.description}{" "}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="primary">Go</Button>
                        {enrolling && (
                          <Button 
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnrollmentToggle(displayCourse._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        )}
                      </div>
                      {isFaculty && (
                        <div className="mt-2">
                          <Button 
                            variant="warning" 
                            className="me-2"
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(displayCourse);
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="danger"
                            id="wd-delete-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteCourse(displayCourse._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Link>
                ) : (
                  <>
                    <Card.Img
                      src={getCourseImage(displayCourse._id)}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {displayCourse.name}{" "}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {displayCourse.description}{" "}
                      </Card.Text>
                      {enrolling && showAllCourses && currentUser && (
                         <Button 
                            variant="success"
                            onClick={() => handleEnrollmentToggle(displayCourse._id)}
                         >
                           Enroll
                         </Button>
                      )}
                      {isFaculty && (
                        <div className="mt-2">
                           <Button 
                            variant="warning" 
                            className="me-2"
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault(); 
                              setCourse(displayCourse);
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="danger"
                            id="wd-delete-course-click"
                            onClick={(e) => {
                              e.preventDefault(); 
                              handleDeleteCourse(displayCourse._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </>
                )}
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
