import { registerSchema } from "@/schemas/auth-schemas";
import { actionClient } from ".";
import { db } from "../db";
import bcrypt from "bcrypt";

export const registerAction = actionClient
  .schema(registerSchema)
  .action(({ parsedInput }) => {
    const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);

    return db.user.create({
      data: {
        email: parsedInput.email,
        name: parsedInput.name,
        hashedPassword,
        role: "USER",
      },
    });
  });
