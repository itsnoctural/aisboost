import { api } from "@/lib/api/server";
import { notFound } from "next/navigation";

export default async function TemplateLayout(
  props: { params: Promise<{ id: string; template: string }>; children: React.ReactNode }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const { data: template } = await api.v1
    .templates({ application: params.id })({ id: params.template })
    .index.get();

  if (!template) return notFound();

  return <>{children}</>;
}
