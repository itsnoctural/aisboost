import { dashboardConfig } from "@/config/pages";
import { api } from "@/lib/api/server";
import Link from "next/link";

export async function DashboardHeader() {
  const { data: user } = await api.v1.users["@me"].get({
    fetch: { cache: "no-store" },
  });

  return (
    <header className="z-50 w-full top-0">
      <div className="flex mx-auto h-14 max-w-screen-xl border border-border bg-background items-center px-3 rounded-lg">
        <nav className="flex gap-x-4">
          {dashboardConfig.map(({ title, href, out }) => (
            <Link
              className="border px-2 rounded bg-muted/40 hover:bg-background text-lg"
              key={title}
              href={out ? href : `/dashboard${href}`}
              prefetch={!out}
            >
              {title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 justify-end min-w-0">
          <span className="min-w-0 truncate text-muted-foreground text-md font-medium">
            {user?.email.split("@")[0]}
          </span>
        </div>
      </div>
    </header>
  );
}
