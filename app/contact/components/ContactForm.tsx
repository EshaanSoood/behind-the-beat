export function ContactForm() {
  return (
    <form className="flex flex-col gap-6" aria-labelledby="contact-form-heading">
      <h1
        id="contact-form-heading"
        className="font-display text-[clamp(1.5rem,1.4vw+1rem,2rem)] leading-tight text-brand-purple800"
      >
        Contact Behind the Beat
      </h1>
      <p className="text-sm text-neutral-ui-textMuted">
        Labels only for now. Inputs and handling will arrive with Step 3.
      </p>
      <fieldset className="surface-chamfer flex flex-col gap-4 border border-neutral-ui-border bg-neutral-ui-surface px-6 py-6 text-base text-neutral-ui-text shadow-soft">
        <legend>Reach out</legend>
        <label htmlFor="full-name">Full Name</label>
        <label htmlFor="email">Email</label>
        <label htmlFor="reason">Reason for contacting</label>
        <label htmlFor="message">Message</label>
      </fieldset>
    </form>
  );
}

