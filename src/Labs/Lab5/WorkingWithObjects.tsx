import React, { useState } from "react";
import { FormControl, FormCheck } from 'react-bootstrap';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
    id: "M101", name: "Introduction to Rocket Propulsion",
    description: "Basic principles of rocket propulsion and spacecraft design.",
    course: "RS101",
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Assignment Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end ms-2"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <FormControl className="mb-2 w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>

      {/* Assignment Score */}
      <a id="wd-update-assignment-score"
         className="btn btn-primary float-end ms-2"
         href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <FormControl className="mb-2 w-75" id="wd-assignment-score" type="number"
        defaultValue={assignment.score} onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })}/>

      {/* Assignment Completed */}
      <a id="wd-update-assignment-completed"
         className="btn btn-primary float-end ms-2"
         href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
      <FormCheck className="mb-2 w-75" id="wd-assignment-completed" type="checkbox"
        label="Completed" defaultChecked={assignment.completed} onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>

      {/* Module Section */}
      <h4>Modifying Module Properties</h4>
      {/* Module Name */}
      <a id="wd-update-module-name"
         className="btn btn-primary float-end ms-2"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <FormControl className="mb-2 w-75" id="wd-module-name"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>

      {/* Module Description */}
      <a id="wd-update-module-description"
         className="btn btn-primary float-end ms-2"
         href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Description
      </a>
      <FormControl className="mb-2 w-75" id="wd-module-description"
        defaultValue={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/>
      <hr/>

      <h4>Retrieving Module Object</h4>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={`${MODULE_API_URL}`}>
        Get Module
      </a><hr/>
      <h4>Retrieving Module Name</h4>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
          href={`${MODULE_API_URL}/name`}>
          Get Module Name
        </a><hr/>
    </div>
);}
