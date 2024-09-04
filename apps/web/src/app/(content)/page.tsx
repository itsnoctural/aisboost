import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { MetricsGroup } from "@/components/marketing/metrics";
import { MarketingWrapper } from "@/components/marketing/wrapper";

export const metadata = {
  title: "AisBoost: Your monetization platform.",
  description:
    "Monetize smarter, not harder - our platform puts your ad revenue on autopilot, maximizing your earnings with minimal effort on your part.",
};

export default function Home() {
  return (
    <MarketingWrapper>
      <Hero />
      <Features />
      <MetricsGroup />
    </MarketingWrapper>
  );
}
