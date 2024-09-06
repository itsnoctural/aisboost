import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/keys/columns";
import { api } from "@/lib/api/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: keys } = await api.v1
    .keys({ application: params.id })
    .index.get();

  return <DataTable columns={columns} data={keys || []} />;
}
