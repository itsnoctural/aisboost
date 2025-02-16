import { TemplateForm } from "@/components/forms/template";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <TemplateForm application={params.id} />;
}
