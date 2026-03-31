"use client";
import { signUpSchema, SignUpUserType } from "@/utils/userSchema";
import Form from "./Form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthContainer from "./AuthContainer";
import { Fields } from "@/utils/types/AuthField";
import { DescriptionContent } from "@/utils/types/AuthDescription";

interface Props {
  fields: Fields<SignUpUserType>[];
  description: DescriptionContent;
}

const SignUpForm = ({ fields, description }: Props) => {
  const [serverError, setServerError] = useState("");

  async function onSubmit(formData: SignUpUserType) {
    // const result = await register(formData);
    // if (result?.error) return setServerError(result.error);
  }

  return (
    <AuthContainer title="Login">
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
