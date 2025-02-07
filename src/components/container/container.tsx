import clsx from "clsx";
import { forwardRef } from "react";

/**
 * Container to maintain consistent body padding across the application
 */
export const Container = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...rest }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "m-auto p-4 md:max-w-screen-md lg:max-w-screen-lg",
      className,
    )}
    {...rest}
  />
));

Container.displayName = "Container";
