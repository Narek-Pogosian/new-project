"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  checkoutFormSchema,
  type CheckoutFormType,
} from "@/schemas/checkout-schemas";

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(values: CheckoutFormType) {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      alert("Order placed successfully!");
    }, 2000);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 @container"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="col-span-2 @lg:col-span-1">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 @lg:col-span-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main St"
                    {...field}
                    autoComplete="street-address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="col-span-2 @lg:col-span-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New York"
                    {...field}
                    autoComplete="address-level2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="col-span-2 @lg:col-span-1">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="10001"
                    {...field}
                    autoComplete="postal-code"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="United States"
                    {...field}
                    autoComplete="country"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    {...field}
                    autoComplete="cc-number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="col-span-2 @lg:col-span-1">
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" {...field} autoComplete="cc-exp" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="col-span-2 @lg:col-span-1">
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} autoComplete="cc-csc" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
