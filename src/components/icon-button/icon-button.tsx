import clsx from "clsx";
import { forwardRef } from "react";

/**
 * Basic button that creates a circle in which a character can be placed as a child.
 */
export const IconButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        "flex aspect-square items-center justify-center rounded-full align-middle leading-none transition-colors",
        className,
      )}
      {...rest}
    />
  );
});

IconButton.displayName = "IconButton";
