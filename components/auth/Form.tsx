import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Fields } from "@/utils/types/AuthField";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import FormField from "./FormField";
import { DescriptionContent } from "@/utils/types/AuthDescription";

interface Props<T extends FieldValues> {
  onSubmit: (formData: T) => Promise<void>;
  schema: any;
  serverError?: string;
  fields: Fields<T>[];
  buttonText: string;
  description: DescriptionContent;
}

const Form = <T extends FieldValues>({
  onSubmit,
  schema,
  serverError,
  fields,
  buttonText,
  description,
}: Props<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldDescription
          className={clsx(
            "text-accent-500 pl-3",
            !serverError && "invisible mb-5",
          )}
        >
          {serverError}
        </FieldDescription>
        {fields.map((field) => (
          <FormField<T>
            key={field.name}
            register={register}
            placeholder={field.placeholder}
            type={field.type}
            errors={errors}
            name={field.name}
          />
        ))}
        <Field>
          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            disabled={isSubmitting}
          >
            {buttonText}
          </Button>
          <FieldDescription className="text-center text-white">
            {description.text}{" "}
            <Link
              href={description.linkHref}
              className="text-accent-500 hover:text-accent-500/70! no-underline!"
            >
              {description.linkText}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default Form;
