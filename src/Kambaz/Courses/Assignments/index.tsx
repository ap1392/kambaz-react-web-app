import { FaSearch, FaPlus } from "react-icons/fa";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as db from "../../Database";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );

  return (
    <div id="wd-assignments" className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <h3
        id="wd-assignments-title"
        className="d-flex justify-content-between align-items-center border-bottom pb-2"
      >
        ASSIGNMENTS <span className="text-muted">40% of Total</span>
        <Button variant="light" className="border">
          <FaPlus />
        </Button>
      </h3>

      <ul id="wd-assignment-list" className="list-group">
        {courseAssignments.map((assignment) => (
          <li key={assignment._id} className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
            <div className="flex-grow-1">
              <Link
                to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                className="fw-bold text-decoration-none text-dark"
              >
                {assignment.title}
              </Link>
            </div>
            <Button variant="light" className="border">
              <FaPlus />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
