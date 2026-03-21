import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold font-[family-name:var(--font-jetbrains)] tracking-wide transition-colors border",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        secondary:
          "border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
        destructive:
          "border-transparent bg-[hsl(var(--destructive)/0.15)] text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.3)]",
        outline:
          "border-[hsl(var(--border))] text-[hsl(var(--foreground))]",
        stable:
          "border-[hsl(var(--emerald)/0.35)] bg-[hsl(var(--emerald)/0.1)] text-[hsl(var(--emerald))]",
        failed:
          "border-[hsl(var(--rose)/0.35)] bg-[hsl(var(--rose)/0.1)] text-[hsl(var(--rose))]",
        warning:
          "border-[hsl(var(--amber)/0.35)] bg-[hsl(var(--amber)/0.1)] text-[hsl(var(--amber))]",
        bios:
          "border-[hsl(var(--cyan)/0.3)] bg-[hsl(var(--cyan)/0.08)] text-[hsl(var(--cyan))]",
        ryzenmaster:
          "border-[#a855f7]/30 bg-[#a855f7]/10 text-[#a855f7]",
      },
    },
    defaultVariants: { variant: "default" },
  }
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
