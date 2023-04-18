import { cn } from "@/lib/utils";
import * as React from "react";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4;
};

export const Heading = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ level = 1, children, className, ...props }, ref) => {
    const elProps = {
      ref,
      className: cn(
        "text-3xl font-bold text-black mb-3",
        {
          "text-2xl": level === 2,
          "text-xl": level === 3,
          "text-lg": level === 4,
        },
        className
      ),
      ...props,
    };

    if (level === 2) {
      return <h2 {...elProps}>{children}</h2>;
    }

    if (level === 3) {
      return <h3 {...elProps}>{children}</h3>;
    }

    if (level === 4) {
      return <h4 {...elProps}>{children}</h4>;
    }

    return <h1 {...elProps}>{children}</h1>;
  }
);
Heading.displayName = "Heading";

export type SmallProps = React.HTMLAttributes<HTMLParagraphElement>;

export const Small = React.forwardRef<HTMLParagraphElement, SmallProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-slate-600", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Small.displayName = "Small";
