"use client";

import { marketingConfig } from "@/config/pages";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Header() {
  const [scroll, setScroll] = useState(false);

  const onScroll = () => setScroll(document.documentElement.scrollTop > 25);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        scroll
          ? "border-b border-border/40 bg-background/70 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[3.75rem] w-full max-w-screen-xl items-center px-6">
        <div className="flex items-center gap-x-6">
          <Link href="/">
            <span className="text-lg font-semibold">aisboost.com</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {marketingConfig.map(({ title, href }) => (
              <Link
                className={
                  "transition-colors hover:text-foreground/90 text-muted-foreground"
                }
                href={href}
                key={title}
                prefetch={false}
                target="_blank"
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-1.5">
          <Button variant="outline" size="icon" asChild>
            <Link
              href={"/discord"}
              target="_blank"
              rel="noreferrer"
              prefetch={false}
              aria-label="Discord"
            >
              <FaDiscord size={16} />
            </Link>
          </Button>

          <ThemeToggle />

          <Button size="sm" asChild>
            <Link href="/signin" prefetch={false}>
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
