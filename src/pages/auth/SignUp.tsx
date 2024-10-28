import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpFormControls } from "../../config/index.js";
import { useDispatch } from "react-redux";

// Action
import { signUpUser } from "../../store/slices/auth-slice.js";

import Form from "../../components/common/Form";

import { useToast } from "@/hooks/use-toast.js";

const SignUp = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(signUpUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/sign-in");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/sign-in"
          >
            Sign In
          </Link>
        </p>
      </div>
      <Form
        formControls={signUpFormControls}
        buttonText="Create Acoount"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SignUp;
