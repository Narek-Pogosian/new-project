import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Passwords needs to be atleast 6 characters long" }),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Passwords needs to be atleast 6 characters long" }),
  })
  .refine(
    (vals) => {
      return vals.password === vals.confirmPassword;
    },
    { message: "Passwords don't match" },
  );
