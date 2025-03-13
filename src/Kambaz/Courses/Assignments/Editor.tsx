import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addAssignment, updateAssignment } from "./reducer";
import { Assignment } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const existingAssignment = useSelector((state: RootState) =>
    state.assignmentsReducer.assignments.find((a: Assignment) => a._id === aid)
  );

  const [assignment, setAssignment] = useState<Assignment>({
    title: existingAssignment?.title || "",
    description: existingAssignment?.description || "",
    points: existingAssignment?.points || 100,
    dueDate: existingAssignment?.dueDate || "",
    availableFromDate: existingAssignment?.availableFromDate || "",
    availableUntilDate: existingAssignment?.availableUntilDate || "",
    course: cid || ""
  });

  const handleChange = (field: keyof Assignment, value: string | number) => {
    setAssignment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (existingAssignment) {
      dispatch(updateAssignment({ ...existingAssignment, ...assignment }));
    } else {
      dispatch(addAssignment(assignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={assignment.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.points}
            onChange={(e) => handleChange("points", parseInt(e.target.value))}
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={assignment.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="date"
                value={assignment.availableFromDate}
                onChange={(e) => handleChange("availableFromDate", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Available Until</Form.Label>
              <Form.Control
                type="date"
                value={assignment.availableUntilDate}
                onChange={(e) => handleChange("availableUntilDate", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={handleCancel} className="me-2">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
