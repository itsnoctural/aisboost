import { columns } from "@/components/data-table/keys/columns";
import { DataTable } from "@/components/data-table/keys/data-table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/server";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: keys } = await api.v1
    .keys({ application: params.id })
    .index.get();

  return (
    <>
      <Button asChild>
        <Link href={"keys/new"}>Create</Link>
      </Button>
      <DataTable columns={columns} data={keys || []} />
    </>
  );
}
