import { createElement } from "react";

import { categoryIcon } from "@/config/category-icons";

/** The icon chosen for a category in src/config/category-icons.ts. Decorative only. */
export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  return createElement(categoryIcon(slug), { className, "aria-hidden": true });
}
