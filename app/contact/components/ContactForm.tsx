export function ContactForm() {
  return (
    <form className="stack-md" aria-labelledby="contact-form-heading">
      <h1 id="contact-form-heading">Contact Behind the Beat</h1>
      <p className="tile-meta">
        Labels only for now. Inputs and handling will arrive with Step 3.
      </p>
      <fieldset className="postcard stack-sm chamfered chamfered-border">
        <legend>Reach out</legend>
        <label htmlFor="full-name">Full Name</label>
        <label htmlFor="email">Email</label>
        <label htmlFor="reason">Reason for contacting</label>
        <label htmlFor="message">Message</label>
      </fieldset>
    </form>
  );
}

