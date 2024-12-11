"use client";

import { type getCategoriesWithAttributes } from "@/server/queries/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createProductSchema,
  type CreateProductsSchemaType,
} from "@/schemas/product-schemas";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ProductFormProps {
  categories: Awaited<ReturnType<typeof getCategoriesWithAttributes>>;
}

export default function ProductForm({ categories }: ProductFormProps) {
  const form = useForm<CreateProductsSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: 0,
      poster: "",
      description: "",
      categoryId: undefined,
      images: [{ url: "" }],
      productAttributes: [{ name: "", value: "", quantity: 0 }],
    },
  });

  const attributesFieldArray = useFieldArray({
    control: form.control,
    name: "productAttributes",
  });

  async function onSubmit(vals: CreateProductsSchemaType) {
    console.log(vals);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 @container"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-8">
              <div className="space-y-2">
                <FormLabel>Product Name*</FormLabel>
                <FormDescription>
                  Provide a unique name for the product. This will be used to
                  identify and label the product across the platform.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    form.setValue("slug", slugify(e.target.value));
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-8">
              <div className="space-y-2">
                <FormLabel>Product Slug*</FormLabel>
                <FormDescription>
                  The slug is a URL-friendly version of the product name. It is
                  automatically generated based on the name but can be
                  customized.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter product slug (e.g., my-product)"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-8">
              <div className="space-y-2">
                <FormLabel>Product Price*</FormLabel>
                <FormDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum, est.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Enter product price" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <FormField
          control={form.control}
          name="poster"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-8">
              <div className="space-y-2">
                <FormLabel>Poster Image</FormLabel>
                <FormDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, perferendis.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-8">
              <div className="space-y-2">
                <FormLabel>Product Description</FormLabel>
                <FormDescription>
                  Provide a detailed description of the product. This will help
                  users understand what the product is.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description of the product"
                  rows={4}
                  {...field}
                  className="resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <CategoryAndAttributes categories={categories} />

        <LoadingButton size="lg">Create Product</LoadingButton>
      </form>
    </Form>
  );
}

function CategoryAndAttributes({
  categories,
}: {
  categories: ProductFormProps["categories"];
}) {
  return (
    <>
      <p>Category</p>
      <hr />
      <p>Attributes</p>
    </>
  );
}
