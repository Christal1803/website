import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Conviction } from "@/components/sections/Conviction";
import { RareScoreTeaser } from "@/components/sections/RareScoreTeaser";
import { RareScore } from "@/components/sections/RareScore";
import { CuratedOpportunities } from "@/components/sections/CuratedOpportunities";
import { TrustBlock } from "@/components/sections/TrustBlock";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      {/* <Conviction /> */}
      {/* <RareScoreTeaser /> */}
      <RareScore />
      <CuratedOpportunities />
      <TrustBlock />
    </main>
  );
}
