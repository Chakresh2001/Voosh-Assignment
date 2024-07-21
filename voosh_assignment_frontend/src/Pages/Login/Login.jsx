import React from "react";
import { Navbar } from "../../Components/Navbar";
import { Form, Input, Button, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    axios.post("http://localhost:8080/user/login", values).then((res)=>{
      localStorage.setItem('userToken', res?.data?.token)
      message.success("Successfully Logged In")
      navigate("/home")
    })
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/user/auth/google";
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="alternate-option">
          Don't have an account? <a style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>Signup</a>
        </div>
        <Button type="default" icon={<GoogleOutlined />} block onClick={handleGoogleLogin}>
          Login with Google
        </Button>
      </div>
    </div>
  );
};
