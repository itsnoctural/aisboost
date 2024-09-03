import { PageTitle } from "@/components/dashboard/page-title";
import { columns } from "@/components/data-table/application/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { data: user } = await api.v1.users["@me"].get({
    fetch: { cache: "no-store" },
  });
  if (!user) return redirect("/signin");

  const { data: applications } = await api.v1.applications.index.get();

  return (
    <>
      <div className="flex">
        <PageTitle
          title="Applications"
          description="Overview of all your applications."
        />
        <div className="flex flex-1 justify-end">
          <Button asChild>
            <Link href={"/dashboard/new"} prefetch={false}>
              Create
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={applications || []} />
      </div>
    </>
  );
}
