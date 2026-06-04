/**
 * Joins class names together, filtering out falsy values.
 * Zero-dependency utility.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
