import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Assignment } from "./types";
import { deleteAssignment, setAssignments } from "./reducer";
import * as coursesClient from "../client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);
  
  const assignments = useSelector((state: RootState) => 
    state.assignmentsReducer.assignments.filter(
      (assignment: Assignment) => assignment.course === cid
    )
  );

  const fetchAssignments = async () => {
    if (!cid) return;
    const assignments = await coursesClient.findAssignmentsForCourse(cid);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleAddAssignment = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
  };

  const handleDeleteClick = (assignment: Assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (assignmentToDelete?._id) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

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
          <Button variant="danger" onClick={handleAddAssignment}>
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <h3
        id="wd-assignments-title"
        className="d-flex justify-content-between align-items-center border-bottom pb-2"
      >
        ASSIGNMENTS <span className="text-muted">40% of Total</span>
      </h3>

      <ul id="wd-assignment-list" className="list-group">
        {assignments.map((assignment: Assignment) => (
          <li key={assignment._id} className="list-group-item d-flex align-items-center border-start border-success border-4 py-3">
            <div className="flex-grow-1">
              <Link
                to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                className="fw-bold text-decoration-none text-dark"
              >
                {assignment.title}
              </Link>
            </div>
            <Button 
              variant="danger" 
              className="ms-2"
              onClick={() => handleDeleteClick(assignment)}
            >
              <FaTrash />
            </Button>
          </li>
        ))}
      </ul>

      <Modal show={showDeleteDialog} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
