import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control id="wd-name" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={5}
            defaultValue={`The assignment is available online
Submit a link to the landing page of your Web application running on Netlify.
The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories
The Kambaz application should include a link to navigate back to the landing page.`}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-points">Points</Form.Label>
              <Form.Control type="number" id="wd-points" defaultValue={100} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
              <Form.Select id="wd-group">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-display-grade-as">
                Display Grade as
              </Form.Label>
              <Form.Select id="wd-display-grade-as">
                <option>Percentage</option>
                <option>Complete/Incomplete</option>
                <option>Points</option>
                <option>Letter Grade</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-submission-type">
                Submission Type
              </Form.Label>
              <Form.Select id="wd-submission-type">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <fieldset className="mb-3">
          <legend>Online Entry Options</legend>
          <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
          <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
          <Form.Check
            type="checkbox"
            id="wd-media-recordings"
            label="Media Recordings"
          />
          <Form.Check
            type="checkbox"
            id="wd-student-annotation"
            label="Student Annotation"
          />
          <Form.Check
            type="checkbox"
            id="wd-file-upload"
            label="File Uploads"
          />
        </fieldset>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-assign-to">Assign To</Form.Label>
              <Form.Control id="wd-assign-to" defaultValue="Everyone" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-due-date">Due</Form.Label>
              <Form.Control
                type="date"
                id="wd-due-date"
                defaultValue="2024-05-13"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-available-from">
                Available From
              </Form.Label>
              <Form.Control
                type="date"
                id="wd-available-from"
                defaultValue="2024-05-06"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-available-until">Until</Form.Label>
              <Form.Control
                type="date"
                id="wd-available-until"
                defaultValue="2024-05-20"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
