import { Link, useLocation, useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kambaz/Courses/${cid}/${link}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item border-0 
            ${pathname.includes(link) ? "active" : "text-danger"}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
