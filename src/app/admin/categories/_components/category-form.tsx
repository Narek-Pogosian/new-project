"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Control, useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createCategorySchema,
  type CreateCategorySchemaType,
} from "@/schemas/category-schemas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function CategoryForm() {
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      image: undefined,
      description: undefined,
      attributes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  console.log(form.getValues());

  function onSubmit(vals: CreateCategorySchemaType) {
    console.log(vals);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="@container space-y-8"
      >
        {/* Category Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="@xl:grid-cols-2 @xl:gap-8 grid gap-1">
              <div className="space-y-2">
                <FormLabel>Category Name*</FormLabel>
                <FormDescription>
                  Provide a unique name for the category. This will be used to
                  identify and label the category across the platform.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        {/* Category Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="@xl:grid-cols-2 @xl:gap-8 grid gap-1">
              <div className="space-y-2">
                <FormLabel>Category Slug*</FormLabel>
                <FormDescription>
                  The slug is a URL-friendly version of the category name. It is
                  automatically generated based on the name but can be
                  customized.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter category slug (e.g., my-category)"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        {/* Category Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="@xl:grid-cols-2 @xl:gap-8 grid gap-1">
              <div className="space-y-2">
                <FormLabel>Category Image</FormLabel>
                <FormDescription>
                  Upload an image to represent the category visually. This image
                  will be displayed alongside the category name.
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

        {/* Category Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="@xl:grid-cols-2 @xl:gap-8 grid gap-1">
              <div className="space-y-2">
                <FormLabel>Category Description</FormLabel>
                <FormDescription>
                  Provide a detailed description of the category. This will help
                  users understand what the category represents.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description of the category"
                  rows={4}
                  {...field}
                  className="resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        {/* Category Attributes */}
        <div>
          <div className="mb-4 space-y-2">
            <FormLabel>Category Attributes</FormLabel>
            <FormDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </FormDescription>
          </div>
          <div className="mb-8 space-y-14">
            {fields.map((attribute, index) => (
              <Attribute
                key={attribute.id}
                control={form.control}
                index={index}
                removeAttribute={remove}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", possibleValues: [] })}
          >
            Add Attribute
          </Button>
        </div>

        <Button>Submit</Button>
      </form>
    </Form>
  );
}

type AttributeProps = {
  index: number;
  control: Control<CreateCategorySchemaType>;
  removeAttribute: (index: number) => void;
};

function Attribute({ index, control, removeAttribute }: AttributeProps) {
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    // @ts-expect-error it works
    name: `attributes[${index}].possibleValues`,
  });

  return (
    <div className="@xl:grid-cols-2 @xl:gap-8 mb-4 grid gap-1">
      <FormField
        control={control}
        name={`attributes.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Attribute Name</FormLabel>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => removeAttribute(index)}
                variant="destructive"
                size="icon"
              >
                <Trash2 />
                <span className="sr-only">Remove Attribute</span>
              </Button>
              <FormControl>
                <Input placeholder="Attribute name" {...field} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <FormLabel>Possible Values</FormLabel>
        {valueFields.map((_, valueIndex) => (
          <FormField
            key={valueIndex}
            control={control}
            name={`attributes.${index}.possibleValues.${valueIndex}`}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="sr-only">Possible Value</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Enter possible value" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => removeValue(valueIndex)}
                  >
                    <span className="sr-only">Remove Value</span>
                    <Trash2 />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          // @ts-expect-error it works
          onClick={() => appendValue("")}
          className="mt-2 block"
          size="sm"
        >
          Add Possible Value
        </Button>
      </div>
    </div>
  );
}

export default CategoryForm;
