import { Section } from "../../components/Section";
import { generateMetadata as genMeta } from "../../lib/seo";

export const metadata = genMeta({
  title: "Privacy Policy",
  description: "Understand how Behind the Beat handles your data and email preferences.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section as="div" className="py-16 space-y-6">
      <h1>Privacy Policy</h1>
      <p>
        We collect only the essentials: your email address if you subscribe to the newsletter and basic analytics to see
        which stories resonate. Subscriber information stays within Behind the Beat — we never sell or share your data.
      </p>
      <p>
        You can unsubscribe at any time using the link in each email. For questions or data requests, reach out via the
        contact page and we&apos;ll respond promptly.
      </p>
    </Section>
  );
}


