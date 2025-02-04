import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const courses = [
    {
      id: 4700,
      title: "CS 4700 Networks",
      description: "Computer Networks",
      image: "/images/networks.jpg",
    },
    {
      id: 1210,
      title: "ENVR 1210 Climate Change",
      description: "Climate Change",
      image: "/images/climateChange.jpg",
    },
    {
      id: 1145,
      title: "PHIL 1145 Technology and Human Values",
      description: "Technology and Human Values",
      image: "/images/tech.jpg",
    },
    {
      id: 1125,
      title: "THTR 1125 Improvisation",
      description: "Improv",
      image: "/images/improv.jpg",
    },
    {
      id: 2000,
      title: "IS 2000 Principles of Information Science",
      description: "Principles of Information Science",
      image: "/images/infoSci.jpg",
    },
    {
      id: 3800,
      title: "CS 3800 Theory of Computation",
      description: "Theory of Computation",
      image: "/images/theory.jpg",
    },
    {
      id: 3000,
      title: "CS 3000 Algorithms",
      description: "Algorithms and Data",
      image: "/images/algo.jpg",
    },
  ];

  return (
    <div id="wd-dashboard" className="container mt-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {courses.map((course) => (
          <Col key={course.id} className="d-flex justify-content-center">
            <Card style={{ width: "260px" }} className="shadow">
              <Link
                to={`/Kambaz/Courses/${course.id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img variant="top" src={course.image} height={160} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
