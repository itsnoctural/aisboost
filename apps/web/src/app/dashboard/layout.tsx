import { DashboardHeader } from "@/components/dashboard/header";
import { Shell } from "@/components/dashboard/shell";

export default function DashboardLayout({
  children,
}: { children: Readonly<React.ReactNode> }) {
  return (
    <div className="p-2">
      <DashboardHeader />
      <Shell>{children}</Shell>
    </div>
  );
}
