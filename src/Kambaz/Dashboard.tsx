import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/4700/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/networks.jpg" width={200} />
            <div>
              <h5>CS 4700 Networks</h5>
              <p className="wd-dashboard-course-title">Computer Networks</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1210/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/climateChange.jpg" width={200} />
            <div>
              <h5>ENVR 1210 Climate Change</h5>
              <p className="wd-dashboard-course-title">Climate Change</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1145/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/tech.jpg" width={200} />
            <div>
              <h5>PHIL 1145 Technology and Human Values</h5>
              <p className="wd-dashboard-course-title">
                Technology and Human Values
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1125/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/improv.jpg" width={200} />
            <div>
              <h5>THTR 1125 Improvisation</h5>
              <p className="wd-dashboard-course-title">Improv</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/2000/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/infoSci.jpg" width={200} />
            <div>
              <h5>IS 2000 Principles of Information Science</h5>
              <p className="wd-dashboard-course-title">
                Principles of Information Science
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3800/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/theory.jpg" width={200} />
            <div>
              <h5>CS 3800 Theory of Computation</h5>
              <p className="wd-dashboard-course-title">Theory of Computation</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3000/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/algo.jpg" width={200} />
            <div>
              <h5>CS 3000 Algorithms</h5>
              <p className="wd-dashboard-course-title">Algorithms and Data</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
