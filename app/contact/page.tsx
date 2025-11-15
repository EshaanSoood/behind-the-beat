import { Section } from "../../components/Section";
import { generateMetadata as genMeta } from "../../lib/seo";

import { ContactForm } from "./components/ContactForm";

export const metadata = genMeta({
  title: "Contact",
  description: "Get in touch with Behind the Beat.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="flex flex-col gap-12">
      <ContactForm />
    </Section>
  );
}

