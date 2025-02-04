import { Row, Col } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Modules() {
  return (
    <div className="container-fluid">
      <Row className="mt-3">
        <Col xs={12} lg={9}>
          <ModulesControls />
          <ul id="wd-modules" className="list-group rounded-0 mt-3">
            <li className="wd-module list-group-item p-0 mb-3 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                Week 1
                <ModuleControlButtons />
              </div>
              <ul className="wd-lessons list-group rounded-0">
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  LEARNING OBJECTIVES
                  <LessonControlButtons />
                </li>
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  Introduction to the course
                  <GreenCheckmark />
                  <LessonControlButtons />
                </li>
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  Learn what is Web Development
                  <GreenCheckmark />
                  <LessonControlButtons />
                </li>
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  LESSON 1
                  <GreenCheckmark />
                  <LessonControlButtons />
                </li>
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  LESSON 2
                  <GreenCheckmark />
                  <LessonControlButtons />
                </li>
              </ul>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}
