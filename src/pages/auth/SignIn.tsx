import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/common/Form";
import { loginFormControls } from "../../config/index.js";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onSubmit = () => {};

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in into your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/sign-up"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <Form
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
