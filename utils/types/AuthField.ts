import { FieldValues, Path } from "react-hook-form";

export interface Fields<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  type: "email" | "password";
}
