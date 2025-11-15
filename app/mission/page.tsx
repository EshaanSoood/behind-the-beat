import { Section } from "../../components/Section";
import { generateMetadata as genMeta } from "../../lib/seo";

import { MissionProse } from "./components/MissionProse";

export const metadata = genMeta({
  title: "Mission",
  description: "Why we built a cozy digital magazine for interviews and reviews.",
  path: "/mission",
});

export default function MissionPage() {
  return (
    <Section as="article" className="flex flex-col gap-12" data-page="mission">
      <MissionProse />
    </Section>
  );
}

