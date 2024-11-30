"use client";

import {
  registerSchema,
  type RegisterSchemaType,
} from "@/schemas/auth-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerAction } from "@/server/actions/auth";
import { LoadingButton } from "@/components/ui/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const { executeAsync, result } = useAction(registerAction, {
    onExecute: () => {
      setIsLoading(true);
    },
    onSuccess: async ({ input }) => {
      const res = await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  async function onSubmit(data: RegisterSchemaType) {
    if (isLoading) {
      return;
    }

    await executeAsync(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {result.serverError && (
          <p className="font-semibold text-danger-600 dark:text-danger-500">
            Something went wrong
          </p>
        )}

        <LoadingButton loading={isLoading} type="submit">
          Register
        </LoadingButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
