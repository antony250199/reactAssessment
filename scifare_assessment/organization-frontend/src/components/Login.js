import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Checkbox } from "antd";
import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import UserService from "../services/UserService";
import { isLoggedIn } from "../services/AuthService";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = AuthService;
  const navigate = useNavigate();
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    console.log("test");
    e.preventDefault();
    try {
      let data = {
        username: username,
        password: password,
      };
      const res = await UserService.loginData(data);
      console.log(res.data, "response");
      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        navigate("/list");
      } else {
        let message =
          typeof res?.data?.message != "string"
            ? res?.data?.message[0]
            : res?.data?.message;
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkLoggedIn = () => {
    try {
      if (isLoggedIn()) {
        navigate("/list");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="div">
      <Row>
        <Col span={15}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="image"
          />
        </Col>
        <Col span={9} style={{ padding: "50px 20px 50px 0" }}>
          <Input.Group className="mb-4">
            <Input
              size="large"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Input.Group>
          <Input.Group className="mb-4">
            <Input.Password
              size="large"
              placeholder="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Input.Group>
          <div className="d-flex justify-content-between mx-4 mb-4">
            <Checkbox>Remember me</Checkbox>
          </div>
          <Button
            className=" w-100"
            size="large"
            type="primary"
            style={{
              margin: "10px",
              width: "90%",
            }}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <a href="/register">
            <Button
              className=" w-100"
              size="large"
              style={{
                backgroundColor: "#3b5998",
                margin: "10px",
                width: "90%",
              }}
            >
              Register{" "}
            </Button>
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
