import { featuresConfig } from "@/config/features";

function Card({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="size-full rounded-xl border bg-card shadow">
      <div className="flex items-center gap-x-3 p-5">
        <div className="rounded border p-2">{icon}</div>
        <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
      </div>
      <div className="p-5 pt-0">
        <p className="text-left text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="flex flex-col gap-y-8 px-3" id="features">
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-3">
        <h2 className="text-3xl font-bold">Ready to explore?</h2>
        <p className="text-lg text-muted-foreground">
          Discover the next wave of the future right now.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuresConfig.map(({ title, description, CustomIcon }, index) => (
          <Card
            key={title}
            title={title}
            description={description}
            icon={<CustomIcon />}
          />
        ))}
      </div>
    </section>
  );
}
