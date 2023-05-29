"use client";

import React, { HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

const heading = cva("group font-display font-bold relative my-10", {
  variants: {
    level: {
      1: "text-5xl",
      2: "text-4xl",
      3: "text-3xl",
      4: "text-2xl",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof heading>;

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, className, children, ...props }, ref) => {
    const Comp = `h${level ?? 1}` as const;
    return (
      <Comp ref={ref} className={heading({ level, className })} {...props}>
        {children}
      </Comp>
    );
  }
);
Heading.displayName = "Heading";
