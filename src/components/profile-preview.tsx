import { cn } from "@/lib/cn";
import Image from "next/image";
import React from "react";
import { HTMLAttributes } from "react";

export type ProfilePreviewProps = HTMLAttributes<HTMLDivElement>;

export const ProfilePreview = React.forwardRef<
  HTMLDivElement,
  ProfilePreviewProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 w-full max-w-3xl gap-x-10 gap-y-6",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
ProfilePreview.displayName = "ProfilePreview";

export type ProfilePreviewImageProps = {
  description?: string;
  src: string;
  alt: string;
};

export const ProfilePreviewImage = React.forwardRef<
  HTMLDivElement,
  ProfilePreviewImageProps
>(({ description, src, alt }, ref) => {
  return (
    <div className="md:col-span-1 mx-auto w-full" ref={ref}>
      <div className="relative block aspect-profile max-w-[240px] mx-auto">
        <Image
          className="rounded-lg mx-auto h-full w-full"
          src={src}
          alt={alt}
          fill
        />
      </div>
      {description && <p>{description}</p>}
    </div>
  );
});
ProfilePreviewImage.displayName = "ProfilePreviewImage";

export type ProfilePreviewDescriptionProps = HTMLAttributes<HTMLDivElement>;

export const ProfilePreviewDescription = React.forwardRef<
  HTMLDivElement,
  ProfilePreviewDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <div className="md:col-span-2 flex flex-col gap-2" ref={ref} {...props}>
      {children}
    </div>
  );
});
ProfilePreviewDescription.displayName = "ProfilePreviewDescription";
