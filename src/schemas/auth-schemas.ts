import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Passwords needs to be atleast 6 characters long" }),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().trim().min(1, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Passwords needs to be atleast 6 characters long" }),
  })
  .refine(
    (vals) => {
      return vals.password === vals.confirmPassword;
    },
    { message: "Passwords don't match" },
  );

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
