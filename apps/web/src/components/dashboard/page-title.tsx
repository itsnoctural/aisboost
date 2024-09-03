export async function PageTitle({
  title,
  description,
}: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
