import { DashboardChart } from "@/components/chart";
import { Metric } from "@/components/dashboard/metric";

import { api } from "@/lib/api/server";
import { FaRegFlag } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";
import { VscKey } from "react-icons/vsc";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: total } = await api.v1
    .metrics({ application: params.id })
    .total.get();

  const { data } = await api.v1.metrics({ application: params.id }).index.get();

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          name="Generated Keys"
          value={total?.generated || 0}
          icon={<VscKey />}
        />
        <Metric
          name="Checkpoints"
          value={total?.checkpoints || 0}
          icon={<FaRegFlag />}
        />
        <Metric
          name="Verified"
          value={total?.verified || 0}
          icon={<IoCheckmark />}
        />
        <Metric
          name="Rejected"
          value={total?.rejected || 0}
          icon={<HiXMark />}
        />
      </div>
      <DashboardChart data={data} />
    </>
  );
}
