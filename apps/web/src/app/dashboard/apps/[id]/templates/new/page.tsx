import { TemplateForm } from "@/components/forms/template";

export default async function Page({ params }: { params: { id: string } }) {
  return <TemplateForm application={params.id} />;
}
