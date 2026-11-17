import { projects, exampleCode } from '../content.js';

export default function Code() {
  return (
    <>
      <header className="page-head">
        <div>
          <h1>Code</h1>
          <p className="lede">Analysis tools I wrote for astronomy research. Each project links to its repository.</p>
        </div>
      </header>

      <section className="project-grid">
        {projects.map((p) => (
          <article className="card project" key={p.name}>
            <div className="card-title">
              <span>{p.name}</span>
              <span className="tag">{p.language}</span>
            </div>
            <p>{p.blurb}</p>
            <a className="btn" href={p.link} target="_blank" rel="noreferrer">View on GitHub</a>
          </article>
        ))}
      </section>

      <section className="card">
        <h2 className="card-heading">{exampleCode.title}</h2>
        <p className="hint">{exampleCode.note}</p>
        <pre><code>{exampleCode.code}</code></pre>
      </section>
    </>
  );
}
