import "./index.css";

export function ErrorBlock() {
  return (
    <section className="error-block" role="status" aria-live="polite">
      <h2 className="error-block__title">Uh oh, I'm out of tokens</h2>
      <p className="error-block__message">
        Check out my resume while I add more tokens.
      </p>
      <a className="error-block__resume-link" href="/SharadBhat_Resume.pdf" download>
        View resume
      </a>
    </section>
  );
}
