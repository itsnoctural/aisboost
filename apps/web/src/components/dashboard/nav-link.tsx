"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ title, href }: { title: string; href: string }) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      className={`border px-3 py-1 rounded ${isActive ? "bg-muted/50" : "hover:bg-muted/50 border-transparent"}`}
      href={href}
    >
      {title}
    </Link>
  );
}
