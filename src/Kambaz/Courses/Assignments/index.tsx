import { FaSearch, FaPlus } from "react-icons/fa";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Assignments() {
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
        <li className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
          <div className="flex-grow-1">
            <a
              href="#/Kambaz/Courses/4700/Assignments/1"
              className="fw-bold text-decoration-none text-dark"
            >
              A1 - Network Basics
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules |{" "}
              <strong>Not available until Jan 22 at 12:00am</strong> |{" "}
              <strong>Due</strong> Jan 29 at 11:59pm | 100 pts
            </p>
          </div>
          <Button variant="light" className="border">
            <FaPlus />
          </Button>
        </li>

        <li className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
          <div className="flex-grow-1">
            <a
              href="#/Kambaz/Courses/1210/Assignments/2"
              className="fw-bold text-decoration-none text-dark"
            >
              A1 - Climate Systems
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules |{" "}
              <strong>Not available until Jan 22 at 12:00am</strong> |{" "}
              <strong>Due</strong> Jan 30 at 11:59pm | 80 pts
            </p>
          </div>
          <Button variant="light" className="border">
            <FaPlus />
          </Button>
        </li>

        <li className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
          <div className="flex-grow-1">
            <a
              href="#/Kambaz/Courses/1145/Assignments/3"
              className="fw-bold text-decoration-none text-dark"
            >
              A1 - Ethics in Technology
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules |{" "}
              <strong>Not available until Jan 24 at 12:00am</strong> |{" "}
              <strong>Due</strong> Jan 31 at 11:59pm | 90 pts
            </p>
          </div>
          <Button variant="light" className="border">
            <FaPlus />
          </Button>
        </li>

        <li className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
          <div className="flex-grow-1">
            <a
              href="#/Kambaz/Courses/1125/Assignments/4"
              className="fw-bold text-decoration-none text-dark"
            >
              A1 - Introduction to Improvisation
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules |{" "}
              <strong>Not available until Jan 25 at 12:00am</strong> |{" "}
              <strong>Due</strong> Feb 1 at 11:59pm | 75 pts
            </p>
          </div>
          <Button variant="light" className="border">
            <FaPlus />
          </Button>
        </li>

        <li className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
          <div className="flex-grow-1">
            <a
              href="#/Kambaz/Courses/2000/Assignments/5"
              className="fw-bold text-decoration-none text-dark"
            >
              A1 - Information Science Overview
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules |{" "}
              <strong>Not available until Jan 26 at 12:00am</strong> |{" "}
              <strong>Due</strong> Feb 2 at 11:59pm | 100 pts
            </p>
          </div>
          <Button variant="light" className="border">
            <FaPlus />
          </Button>
        </li>

        <li className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
          <div className="flex-grow-1">
            <a
              href="#/Kambaz/Courses/3800/Assignments/6"
              className="fw-bold text-decoration-none text-dark"
            >
              A1 - Introduction to Computation Theory
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules |{" "}
              <strong>Not available until Jan 27 at 12:00am</strong> |{" "}
              <strong>Due</strong> Feb 3 at 11:59pm | 85 pts
            </p>
          </div>
          <Button variant="light" className="border">
            <FaPlus />
          </Button>
        </li>

        <li className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
          <div className="flex-grow-1">
            <a
              href="#/Kambaz/Courses/3000/Assignments/7"
              className="fw-bold text-decoration-none text-dark"
            >
              A1 - Algorithm Design Basics
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules |{" "}
              <strong>Not available until Jan 28 at 12:00am</strong> |{" "}
              <strong>Due</strong> Feb 4 at 11:59pm | 120 pts
            </p>
          </div>
          <Button variant="light" className="border">
            <FaPlus />
          </Button>
        </li>
      </ul>
    </div>
  );
}
