import { twMerge } from "tailwind-merge";
import clsx from "clsx";

// Merge Tailwind class names with conditional class support
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
