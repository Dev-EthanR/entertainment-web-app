import SignUpForm from "@/components/auth/SignUpForm";
import { Fields } from "@/utils/types/AuthField";
import { SignUpUserType } from "@/utils/userSchema";

const RegisterPage = () => {
  const fields: Fields<SignUpUserType>[] = [
    {
      name: "email",
      placeholder: "Email Address",
      type: "email",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

  const description = {
    text: "Already have an account?",
    linkText: "Login",
    linkHref: "/login",
  };
  return <SignUpForm fields={fields} description={description} />;
};

export default RegisterPage;
