import { KeyForm } from "@/components/forms/key";

export default async function Page({ params }: { params: { id: string } }) {
  return <KeyForm application={params.id} />;
}
