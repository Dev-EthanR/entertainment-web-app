"use client";
import { register } from "@/lib/actions/register";
import { DescriptionContent } from "@/utils/types/AuthDescription";
import { Fields } from "@/utils/types/AuthField";
import { signUpSchema, SignUpUserType } from "@/utils/userSchema";
import { useState } from "react";
import AuthContainer from "./AuthContainer";
import Form from "./Form";

interface Props {
  fields: Fields<SignUpUserType>[];
  description: DescriptionContent;
}

const SignUpForm = ({ fields, description }: Props) => {
  const [serverError, setServerError] = useState("");

  async function onSubmit(data: SignUpUserType) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const result = await register(formData);
    if (result?.error) return setServerError(result.error);
  }

  return (
    <AuthContainer title="Sign Up">
      <Form
        onSubmit={onSubmit}
        schema={signUpSchema}
        serverError={serverError}
        fields={fields}
        buttonText={"Create an account"}
        description={description}
      />
    </AuthContainer>
  );
};

export default SignUpForm;
