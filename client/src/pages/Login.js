import { useState } from "react";import axios from "axios";
import axiosError from "../handler/axiosError.handler";
import { Form, Button, Card } from "react-bootstrap";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("/auth/login", { username, password })
      .catch(axiosError);

    console.log("🚀 -> file: Login.js:33 -> result.data:", result?.data);
  };
  let content;
  content = (
    <>
      <Card className="w-50 mx-auto">
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter Username"
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );

  return content;
};
export default Login;
