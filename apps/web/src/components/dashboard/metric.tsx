export function Metric({
  name,
  value,
  icon,
}: { name: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-2 bg-background/50 p-6 border shadow rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-medium tracking-tight">{name}</h3>
        {icon}
      </div>
      <div className="font-bold text-2xl">+{value}</div>
    </div>
  );
}
