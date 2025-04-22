import { NavLink } from "@/components/dashboard/nav-link";
import { api } from "@/lib/api/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { data: application } = await api.v1
    .applications({ id: params.id })
    .index.get();

  return {
    title: application?.name,
  };
}

export default async function ApplicationLayout(props: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;

  const { children } = props;

  const { data: application } = await api.v1
    .applications({ id: params.id })
    .index.get();

  if (!application) return notFound();

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-3xl font-semibold">{application.name}</h1>
        <nav className="flex gap-x-2">
          <NavLink href={`/dashboard/apps/${params.id}`} title="Overview" />
          <NavLink href={`/dashboard/apps/${params.id}/keys`} title="Keys" />
          <NavLink
            href={`/dashboard/apps/${params.id}/templates`}
            title="Templates"
          />
          <NavLink
            href={`/dashboard/apps/${params.id}/settings`}
            title="Settings"
          />
        </nav>
      </div>
      {children}
    </>
  );
}
