"use client";

import { type getCategoriesWithAttributes } from "@/server/queries/categories";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  categories: Awaited<ReturnType<typeof getCategoriesWithAttributes>>;
}

export default function ProductForm({ categories }: ProductFormProps) {
  const form = useForm<CreateProductsSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: "" as unknown as number,
      poster: "",
      description: "",
      categoryId: "" as unknown as number,
      images: [""],
      productAttributes: [{ name: "", values: [] }],
    },
  });

  console.log(form.getValues());

  async function onSubmit(vals: CreateProductsSchemaType) {
    console.log(vals);
    form.reset({ productAttributes: [{ name: "", values: [] }] });
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

        <CategoryAndAttributes categories={categories} form={form} />

        <LoadingButton size="lg">Create Product</LoadingButton>
      </form>
    </Form>
  );
}

function CategoryAndAttributes({
  categories,
  form,
}: {
  categories: ProductFormProps["categories"];
  form: UseFormReturn<CreateProductsSchemaType>;
}) {
  const [, setForceRender] = useState(0);
  const selectedCategoryId = form.watch("categoryId");

  const handleCategoryChange = (val: string) => {
    const categoryAttributes =
      categories.find((c) => c.id.toString() === val)?.categoryAttributes ?? [];

    form.setValue(
      "productAttributes",
      categoryAttributes.map((attr) => ({ name: attr.name, values: [] })),
    );
    form.setValue("categoryId", parseInt(val));
  };

  const handleAttributeChange = (attributeName: string, value: string) => {
    const updatedAttributes = form
      .getValues("productAttributes")
      .map((attr) => {
        if (attr.name === attributeName) {
          const isChecked = attr.values.includes(value);
          const newValues = isChecked
            ? attr.values.filter((v) => v !== value)
            : [...attr.values, value];
          return { ...attr, values: newValues };
        }
        return attr;
      });

    form.setValue("productAttributes", updatedAttributes);
    setForceRender((v) => v + 1);
  };

  const categoryAttributes =
    categories.find((c) => c.id == selectedCategoryId)?.categoryAttributes ??
    [];

  return (
    <>
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-8">
            <div className="space-y-2">
              <FormLabel>Category</FormLabel>
              <FormDescription>
                Select a category to assign the product.
              </FormDescription>
              <FormMessage />
            </div>
            <Select
              onValueChange={(value) => {
                handleCategoryChange(value);
                field.onChange(value);
              }}
              value={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {selectedCategoryId && categoryAttributes.length > 0 && (
        <>
          <hr />
          <div>
            <p className="mb-6 text-sm font-medium leading-none">
              Choose the available attributes for this product:
            </p>
            <div className="space-y-6">
              {categoryAttributes.map((attr) => (
                <div key={attr.id}>
                  <p className="mb-2 text-sm font-medium leading-none">
                    {attr.name}
                  </p>
                  <ul className="flex gap-6">
                    {attr.possibleValues.map((val) => {
                      const isChecked = form
                        .getValues("productAttributes")
                        .find((attribute) => attribute.name === attr.name)
                        ?.values.includes(val);

                      return (
                        <Label
                          key={val}
                          className="flex cursor-pointer items-center gap-1"
                        >
                          <input
                            type="checkbox"
                            className="size-4"
                            checked={isChecked}
                            onChange={() =>
                              handleAttributeChange(attr.name, val)
                            }
                          />
                          {val}
                        </Label>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
