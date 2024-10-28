import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/common/Form";
import { loginFormControls } from "../../config/index.js";
import { useDispatch } from "react-redux";

import { signInUser } from "../../store/slices/auth-slice.js";

import { useToast } from "@/hooks/use-toast.js";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (event: any) => {
    event.preventDefault();

    dispatch(signInUser(formData)).then((data) => {
      console.log(data);

      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

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
