import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/template/columns";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/server";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: templates } = await api.v1
    .templates({ application: params.id })
    .index.get();

  return (
    <>
      <Button asChild>
        <Link href={"templates/new"}>Create</Link>
      </Button>
      <DataTable columns={columns} data={templates || []} />
    </>
  );
}
