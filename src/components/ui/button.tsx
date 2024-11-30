import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm dark:shadow-black hover:bg-primary/90 ring-offset-2 ring-offset-background",
        accent:
          "bg-gradient-to-tr from-accent-700 to-accent-500 text-accent-foreground shadow-sm hover:bg-accent-700 shadow-sm dark:shadow-black",
        destructive:
          "bg-danger-600 text-white shadow-sm hover:bg-danger-700 shadow-sm dark:shadow-black",
        outline: "border shadow-sm dark:shadow-black bg-background-card",
        ghost: "hover:bg-background-muted",
        link: "text-accent-700 dark:text-accent-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-1.5",
        sm: "rounded py-1.5 px-3 text-xs",
        lg: "rounded py-2 text-lg px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
