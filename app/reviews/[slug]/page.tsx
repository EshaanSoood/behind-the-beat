import { Section } from "../../../components/Section";

import { ReviewBody } from "./components/ReviewBody";
import { ReviewHeader } from "./components/ReviewHeader";
import { TracklistBox } from "./components/TracklistBox";

type ReviewEntryPageProps = {
  params: {
    slug: string;
  };
};

export default function ReviewEntryPage({ params }: ReviewEntryPageProps) {
  return (
    <>
      <Section>
        <ReviewHeader />
        <p>Loaded review for: {params.slug}</p>
      </Section>
      <Section>
        <ReviewBody />
      </Section>
      <Section>
        <TracklistBox />
      </Section>
    </>
  );
}

