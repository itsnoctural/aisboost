import { ApplicationForm } from "@/components/forms/application";
import { api } from "@/lib/api/server";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data: application } = await api.v1
    .applications({ id: params.id })
    .index.get();

  if (!application) return notFound();

  return (
    <>
      <ApplicationForm
        defaultValues={{
          ...application,
          webhook: application?.webhook ?? "",
          webhookContent: application?.webhookContent ?? "",
        }}
      />
    </>
  );
}
