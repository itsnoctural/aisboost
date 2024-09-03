import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { MetricsGroup } from "@/components/marketing/metrics";
import { MarketingWrapper } from "@/components/marketing/wrapper";

export default function Home() {
  return (
    <MarketingWrapper>
      <Hero />
      <Features />
      <MetricsGroup />
    </MarketingWrapper>
  );
}
