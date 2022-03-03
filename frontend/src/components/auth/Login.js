import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import URL from "../../config";
import { AppContext } from "../../App";
import { Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { logged, setLogged, loading, setLoading } = useContext(AppContext);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${URL}login`, {
        username: email,
        password: pwd,
      });
      setLoading(false);
      console.log(res);
      if (res.data.success) return setLogged(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (logged) return <Navigate to="/home" />;

  return (
    <div>
      <Form>
        <Form.Group
          className="mb-3 col-xl-4 col-md-8 col-sm-10"
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3 col-xl-4 col-md-8 col-sm-10"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3 col-xl-4 col-md-8 col-sm-10"
          controlId="formBasicCheckbox"
        >
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button onClick={loginUser} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;