import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Sree Raam Shethu Constructions & Interiors" noindex />
      <section className="nf">
        <div className="container nf__inner">
          <div className="nf__device" aria-hidden="true">
            <span className="nf__ghost">404</span>
            <span className="nf__ruler" />
            <span className="nf__ruler nf__ruler--2" />
          </div>
          <span className="eyebrow">Error 404 — plot not found</span>
          <h1 className="display">
            This floor <br />
            <span className="accent">wasn&#39;t in the blueprints.</span>
          </h1>
          <p className="muted">
            The page you&#39;re looking for has been removed or never laid out.
            Let&#39;s get you back on solid ground.
          </p>
          <div className="nf__actions">
            <Link to="/" className="btn btn--solid">Back to home</Link>
            <Link to="/projects" className="btn btn--outline">View projects</Link>
          </div>
        </div>
      </section>
    </>
  );
}