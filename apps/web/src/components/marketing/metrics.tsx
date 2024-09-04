import { api } from "@/lib/api/server";

function Metric({
  value,
  description,
}: {
  value: number | undefined;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-3xl font-semibold">{value || 0}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export async function MetricsGroup() {
  const { data } = await api.v1.metrics.general.get({
    fetch: { next: { revalidate: 300 } },
  });

  return (
    <section className="flex w-full justify-center px-3">
      <div className="w-full max-w-4xl rounded-xl border bg-card p-6 text-center items-center mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
          <Metric
            value={data?.checkpoints}
            description="Checkpoints compeleted"
          />
          <Metric
            value={data?.applications}
            description="Active applications"
          />
          <Metric value={data?.users} description="Total users" />
        </div>
      </div>
    </section>
  );
}
