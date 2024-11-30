"use server";

import { registerSchema } from "@/schemas/auth-schemas";
import { actionClient } from ".";
import { db } from "../db";
import bcrypt from "bcrypt";

export const registerAction = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);

    const user = await db.user.create({
      data: {
        email: parsedInput.email,
        name: parsedInput.name,
        hashedPassword,
        role: "USER",
      },
    });

    if (!user) {
      throw Error("Something went wrong");
    }

    return { email: parsedInput.email, password: parsedInput.password };
  });
