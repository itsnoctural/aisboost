import { ApplicationForm } from "@/components/forms/application";
import { api } from "@/lib/api/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: application } = await api.v1
    .applications({ id: params.id })
    .index.get();

  if (!application) return notFound();

  return (
    <>
      <ApplicationForm defaultValues={application} />
    </>
  );
}
