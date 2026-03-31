import SignInForm from "@/components/auth/SignInForm";
import { Fields } from "@/utils/types/AuthField";
import { SignInUserType } from "@/utils/userSchema";

const LoginPage = () => {
  const fields: Fields<SignInUserType>[] = [
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
  ];

  const description = {
    text: "Don't have an account?",
    linkText: "Sign Up",
    linkHref: "/register",
  };
  return <SignInForm fields={fields} description={description} />;
};

export default LoginPage;
