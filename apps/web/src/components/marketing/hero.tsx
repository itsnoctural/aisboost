import Link from "next/link";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="flex w-full justify-center">
      <div className="my-40 flex max-w-5xl flex-col gap-y-5 p-6 text-center">
        <div className="flex flex-col gap-y-6">
          <h1 className="text-6xl font-extrabold">
            Grow your business right now, quickly.
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Monetize smarter, not harder - our platform puts your ad revenue on
            autopilot, maximizing your earnings with minimal effort on your
            part.
          </p>
        </div>

        <div className="flex w-full justify-center gap-x-4">
          <Button asChild>
            <Link href="/signin">Get Started</Link>
          </Button>
          <Button variant="outline" disabled>
            <Link href="/docs" target="_blank" prefetch={false}>
              Documentation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
