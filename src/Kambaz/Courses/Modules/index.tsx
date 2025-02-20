import { Button } from "react-bootstrap";
import { FaEllipsisV, FaCheckCircle, FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const courseModules = db.modules.filter((module: any) => module.course === cid);

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" className="me-2">
          <FaCheckCircle className="me-1" /> Publish All
        </Button>
        <Button variant="light" className="me-2">Collapse All</Button>
        <Button variant="light" className="me-2">View Progress</Button>
        <Button variant="danger">
          <FaPlus className="me-1" /> Module
        </Button>
      </div>

      <ul className="list-group">
        {courseModules.map((module: any) => (
          <li key={module._id} className="list-group-item mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FaEllipsisV className="me-3" />
                <h4 className="mb-0">{module.name}</h4>
              </div>
              <FaEllipsisV />
            </div>

            {module.lessons && (
              <ul className="list-group mt-2">
                {module.lessons.map((lesson: any) => (
                  <li key={lesson._id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <FaEllipsisV className="me-3" />
                        <div>
                          <h5 className="mb-0">{lesson.name}</h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaCheckCircle className="text-success me-2" />
                        <FaEllipsisV />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
