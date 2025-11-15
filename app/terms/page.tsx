import { Section } from "../../components/Section";
import { generateMetadata as genMeta } from "../../lib/seo";

export const metadata = genMeta({
  title: "Terms of Use",
  description: "Review the terms and conditions for using Behind the Beat.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section as="div" className="py-16 space-y-6">
      <h1>Terms of Use</h1>
      <p>
        Behind the Beat is a passion project dedicated to sharing interviews, reviews, and playlists for curious
        listeners. By using this site you agree not to redistribute content without permission, respect artists and
        fellow community members, and credit our work when you share it.
      </p>
      <p>
        We may update these terms occasionally. Continued use of the site after changes take effect constitutes
        acceptance of the revised policy. For licensing, syndication, or collaboration inquiries please reach out via
        the contact form.
      </p>
    </Section>
  );
}


