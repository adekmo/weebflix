import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        neon: "bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] shadow-[0_0_0_1px_rgba(6,182,212,0.55)_inset,0_0_12px_rgba(6,182,212,0.35),0_0_28px_rgba(6,182,212,0.25)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.7)_inset,0_0_16px_rgba(6,182,212,0.5),0_0_40px_rgba(6,182,212,0.35)] hover:bg-[hsl(var(--neon))]/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
