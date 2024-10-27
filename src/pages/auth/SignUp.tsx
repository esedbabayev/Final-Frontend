import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/common/Form";
import { signUpFormControls } from "../../config/index.js";

const SignUp = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onSubmit = () => {};

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
