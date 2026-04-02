import Image from "next/image";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  children: ReactNode;
}

const AuthContainer = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/icon-logo.svg"
        alt="logo"
        width={30}
        height={30}
        className="mb-20"
      />
      <Card className="w-80 md:w-100 bg-primary-900 rounded-3xl px-2 py-6 md:px-5 md:py-10 ">
        <CardHeader className="mb-3">
          <CardTitle className="text-4xl text-white font-light tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthContainer;
