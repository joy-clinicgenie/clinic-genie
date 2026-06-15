"use client";

import { useEffect } from "react";

/** Applies the blog-post page gradient on `body` so it runs through main and footer. */
export function BlogPostGradientShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("blog-post-page");
    return () => document.body.classList.remove("blog-post-page");
  }, []);

  return children;
}
