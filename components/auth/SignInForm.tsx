"use client";
import { signInSchema, SignInUserType } from "@/utils/userSchema";
import Form from "./Form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthContainer from "./AuthContainer";
import { Fields } from "@/utils/types/AuthField";
import { DescriptionContent } from "@/utils/types/AuthDescription";

interface Props {
  fields: Fields<SignInUserType>[];
  description: DescriptionContent;
}

const SignInForm = ({ fields, description }: Props) => {
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  async function onSubmit(formData: SignInUserType) {
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result.error) {
      setServerError("Invalid email or password");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <AuthContainer title="Login">
      <Form
        onSubmit={onSubmit}
        schema={signInSchema}
        serverError={serverError}
        fields={fields}
        buttonText={"Login to your account"}
        description={description}
      />
    </AuthContainer>
  );
};

export default SignInForm;
