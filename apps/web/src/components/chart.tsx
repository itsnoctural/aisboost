"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  generated: {
    label: "Keys",
    color: "hsl(var(--chart-1))",
  },
  checkpoints: {
    label: "Checkpoints",
    color: "hsl(var(--chart-2))",
  },
  verified: {
    label: "Verified",
    color: "hsl(var(--chart-3))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface Props {
  data:
    | {
        date: Date;
        generated: number;
        checkpoints: number;
        verified: number;
        rejected: number;
      }[]
    | null;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function DashboardChart({ data }: Props) {
  if (!data) data = [];

  return (
    <ChartContainer
      config={chartConfig}
      className="border rounded-xl px-3 py-2"
    >
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={12}
          interval={"preserveStartEnd"}
          tickFormatter={(value) => formatDate(value)}
        />
        {/* <YAxis tickLine={false} axisLine={false} tickMargin={8} /> */}
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => formatDate(value)}
            />
          }
        />
        <defs>
          <linearGradient id="fillGenerated" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-generated)"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="var(--color-generated)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillCheckpoints" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-checkpoints)"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="var(--color-checkpoints)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillVerified" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-verified)"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="var(--color-verified)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillRejected" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-rejected)"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="var(--color-rejected)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="generated"
          type="bump"
          fill="url(#fillGenerated)"
          stroke="var(--color-generated)"
          stackId="gen"
        />
        <Area
          dataKey="checkpoints"
          type="bump"
          fill="url(#fillCheckpoints)"
          stroke="var(--color-checkpoints)"
          stackId="che"
        />
        <Area
          dataKey="verified"
          type="bump"
          fill="url(#fillVerified)"
          stroke="var(--color-verified)"
          stackId="ver"
        />
        <Area
          dataKey="rejected"
          type="bump"
          fill="url(#fillRejected)"
          stroke="var(--color-rejected)"
          stackId="rej"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
