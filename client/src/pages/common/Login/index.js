import { Form, message, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div className="card w-96 p-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-quiz-line text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your Quiz account</p>
          </div>
          
          <div className="divider"></div>
          
          <Form layout="vertical" className="mt-6" onFinish={onFinish}>
            <Form.Item 
              name="email" 
              label={<span className="text-gray-700 font-medium">Email</span>}
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input 
                size="large"
                prefix={<i className="ri-mail-line text-gray-400 mr-2"></i>}
                placeholder="Enter your email"
                className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
              />
            </Form.Item>
            
            <Form.Item 
              name="password" 
              label={<span className="text-gray-700 font-medium">Password</span>}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                size="large"
                prefix={<i className="ri-remixicon-line text-gray-400 mr-2"></i>}
                placeholder="Enter your password"
                className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
              />
            </Form.Item>

            <div className="flex flex-col gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <i className="ri-login-circle-line mr-2"></i>
                Sign In
              </button>
              
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Don't have an account? <span className="underline">Sign up</span>
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
