export default function Modules() {
  return (
    <div>
      <div className="wd-buttons">
        <button>Collapse All</button>
        <button>View Progress</button>
      </div>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1 - Introduction</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Course overview and expectations
                </li>
                <li className="wd-content-item">
                  Getting started with the material
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Course Syllabus</li>
                <li className="wd-content-item">Week 1 Required Reading</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction Slides</li>
                <li className="wd-content-item">
                  Course Overview Presentation
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2 - Core Concepts</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Understanding fundamental concepts
                </li>
                <li className="wd-content-item">Applying basic principles</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Week 2 Required Reading</li>
                <li className="wd-content-item">Supplementary Materials</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENTS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Assignment 1</li>
                <li className="wd-content-item">Practice Problems</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3 - Advanced Topics</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Exploring advanced concepts</li>
                <li className="wd-content-item">Practical applications</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">RESOURCES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Week 3 Materials</li>
                <li className="wd-content-item">Additional Resources</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
