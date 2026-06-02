/**
 * Joins class names together, filtering out falsy values.
 * Zero-dependency utility.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
