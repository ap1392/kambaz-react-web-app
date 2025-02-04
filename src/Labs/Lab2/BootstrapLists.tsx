import ListGroup from "react-bootstrap/ListGroup";

export default function BootstrapLists() {
  return (
    <div id="wd-css-styling-lists">
      <h2>Favorite movies</h2>
      <ListGroup>
        <ListGroup.Item active>Oppenheimer</ListGroup.Item>
        <ListGroup.Item>The Social Network</ListGroup.Item>
        <ListGroup.Item>Good Will Hunting</ListGroup.Item>
        <ListGroup.Item>Grave of the Fireflies</ListGroup.Item>
        <ListGroup.Item disabled>Arrival</ListGroup.Item>
      </ListGroup>
    </div>
  );
}
