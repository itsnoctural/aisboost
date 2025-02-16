import { KeyForm } from "@/components/forms/key";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <KeyForm application={params.id} />;
}
