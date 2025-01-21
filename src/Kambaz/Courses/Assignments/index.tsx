export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/4700/Assignments/1"
            className="wd-assignment-link"
          >
            A1 - Network Basics
          </a>
          <p>
            Multiple Modules |{" "}
            <strong>Not available until Jan 22 at 12:00am</strong> |{" "}
            <strong>Due</strong> Jan 29 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1210/Assignments/2"
            className="wd-assignment-link"
          >
            A1 - Climate Systems
          </a>
          <p>
            Multiple Modules |{" "}
            <strong>Not available until Jan 22 at 12:00am</strong> |{" "}
            <strong>Due</strong> Jan 30 at 11:59pm | 80 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1145/Assignments/3"
            className="wd-assignment-link"
          >
            A1 - Ethics in Technology
          </a>
          <p>
            Multiple Modules |{" "}
            <strong>Not available until Jan 24 at 12:00am</strong> |{" "}
            <strong>Due</strong> Jan 31 at 11:59pm | 90 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1125/Assignments/4"
            className="wd-assignment-link"
          >
            A1 - Introduction to Improvisation
          </a>
          <p>
            Multiple Modules |{" "}
            <strong>Not available until Jan 25 at 12:00am</strong> |{" "}
            <strong>Due</strong> Feb 1 at 11:59pm | 75 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/2000/Assignments/5"
            className="wd-assignment-link"
          >
            A1 - Information Science Overview
          </a>
          <p>
            Multiple Modules |{" "}
            <strong>Not available until Jan 26 at 12:00am</strong> |{" "}
            <strong>Due</strong> Feb 2 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/3800/Assignments/6"
            className="wd-assignment-link"
          >
            A1 - Introduction to Computation Theory
          </a>
          <p>
            Multiple Modules |{" "}
            <strong>Not available until Jan 27 at 12:00am</strong> |{" "}
            <strong>Due</strong> Feb 3 at 11:59pm | 85 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/3000/Assignments/7"
            className="wd-assignment-link"
          >
            A1 - Algorithm Design Basics
          </a>
          <p>
            Multiple Modules |{" "}
            <strong>Not available until Jan 28 at 12:00am</strong> |{" "}
            <strong>Due</strong> Feb 4 at 11:59pm | 120 pts
          </p>
        </li>
      </ul>
    </div>
  );
}
