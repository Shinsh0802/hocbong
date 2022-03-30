import Login from "./Login/Login";
import { Col, Container, Row } from "react-bootstrap";
import "./Login/Login.css";
const LoginPage = () => {
  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Login />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
