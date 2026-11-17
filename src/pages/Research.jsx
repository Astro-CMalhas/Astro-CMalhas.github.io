import { publications, experience, education, honors } from '../content.js';

export default function Research() {
  return (
    <>
      <header className="page-head">
        <div>
          <h1>Research</h1>
          <p className="lede">Papers, conference abstracts and posters.</p>
        </div>
      </header>

      <section className="card">
        <h2 className="card-heading">Publications and posters</h2>
        <ul className="pub-list">
          {publications.map((pub) => (
            <li className="pub" key={pub.title}>
              <div className="pub-title">{pub.title}</div>
              <div className="pub-authors">{pub.authors}</div>
              <div className="pub-meta">
                <span className="tag">{pub.status}</span>
                {pub.venue}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="two-col">
        <div className="card">
          <h2 className="card-heading">Experience</h2>
          <ul className="item-list">
            {experience.map((item) => (
              <li key={item.role + item.place}>
                <div className="item-title">{item.role}</div>
                <div className="item-meta">{item.place}, {item.dates}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="card-heading">Education</h2>
          <ul className="item-list">
            {education.map((item) => (
              <li key={item.role + item.place}>
                <div className="item-title">{item.role}</div>
                <div className="item-meta">{item.place}, {item.dates}</div>
              </li>
            ))}
          </ul>
          <h2 className="card-heading" style={{ marginTop: '1.4rem' }}>Honors</h2>
          <ul className="plain-list">
            {honors.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
