import { TemplateForm } from "@/components/forms/template";
import { api } from "@/lib/api/server";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ id: string; template: string }>;
}) {
  const params = await props.params;
  const { data: template } = await api.v1
    .templates({ application: params.id })({ id: params.template })
    .index.get();

  if (!template) return notFound();

  return (
    <>
      <TemplateForm application={params.id} defaultValues={template} />
    </>
  );
}
