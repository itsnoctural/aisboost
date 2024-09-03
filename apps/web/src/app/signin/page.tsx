import { SignIn as SI } from "@/components/signin";
import { api } from "@/lib/api/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const { data: user } = await api.v1.users["@me"].get({
    fetch: { cache: "no-store" },
  });
  if (!user) return <SI />;

  return redirect("/dashboard");
}
