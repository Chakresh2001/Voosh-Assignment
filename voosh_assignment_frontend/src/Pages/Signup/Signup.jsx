import React from "react";
import { Form, Input, Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./Signup.css";
import { Navbar } from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { message } from "antd";

export const Signup = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {

    axios.post("https://voosh-assignment-4zan.onrender.com/user/register", values).then((res)=>{
      message.success("User Registered Successfully")
      navigate("/")
    })
    .catch((err)=>{
      message.error("OOPS! Something Went Wrong!!")
    })
  };

  const handleGoogleSignup = () => {
    window.location.href = "https://voosh-assignment-4zan.onrender.com/user/auth/google";
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <h2>Signup</h2>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please input your First Name!" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please input your Last Name!" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your Password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords that you entered do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
        </Form>
        <div className="alternate-option">
          Already have an account? <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Login</a>
        </div>
        <Button type="default" icon={<GoogleOutlined />} block onClick={handleGoogleSignup}>
          Signup with Google
        </Button>
      </div>
    </div>
  );
};
