import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid Email").min(1),
  password: z.string("Can't be empty").min(1, "Can't be empty"),
});

export type SignInUserType = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.email("Invalid Email").min(1),
    password: z.string("Can't be empty").min(1, "Can't be empty"),
    confirmPassword: z.string("Can't be empty").min(1, "Can't be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpUserType = z.infer<typeof signUpSchema>;
