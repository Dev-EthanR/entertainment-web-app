import { InputHTMLAttributes } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Field, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import clsx from "clsx";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  errors: FieldErrors<T>;
}

const FormField = <T extends FieldValues>({
  register,
  name,
  placeholder,
  type,
  errors,
}: Props<T>) => {
  return (
    <Field>
      {errors[name] && (
        <FieldDescription className="text-accent-500 pl-4">
          {errors[name]?.message?.toString()}
        </FieldDescription>
      )}
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        aria-required
        aria-label={name}
        className={clsx("input", errors[name] && "border-b-accent-500!")}
      />
    </Field>
  );
};

export default FormField;
