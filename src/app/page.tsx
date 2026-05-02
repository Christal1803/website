import { Hero } from "@/components/sections/Hero";
import { ConsultationStrip } from "@/components/sections/ConsultationStrip";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Conviction } from "@/components/sections/Conviction";
import { RareScoreTeaser } from "@/components/sections/RareScoreTeaser";
import { RareScore } from "@/components/sections/RareScore";
import { Services } from "@/components/sections/Services";
import { CuratedOpportunities } from "@/components/sections/CuratedOpportunities";
import { TrustBlock } from "@/components/sections/TrustBlock";

export default function Home() {
  return (
    <main>
      <Hero />
      <ConsultationStrip />
      <StatsStrip />
      {/* <Conviction /> */}
      {/* <RareScoreTeaser /> */}
      <RareScore />
      <Services />
      <CuratedOpportunities />
      <TrustBlock />
    </main>
  );
}
