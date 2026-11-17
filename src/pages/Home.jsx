import { Link } from 'react-router-dom';
import { profile, homeStats, currentWork } from '../content.js';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>{profile.name}</h1>
        <p className="lede">{profile.tagline}</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/data">Open the data explorer</Link>
          <Link className="btn" to="/research">Research and papers</Link>
          <a className="btn" href={`${import.meta.env.BASE_URL}${profile.cvFile}`}>Download CV</a>
        </div>
      </section>

      <section className="stat-grid">
        {homeStats.map((s) => (
          <div className="card stat" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="two-col">
        <div className="card">
          <h2 className="card-heading">About</h2>
          {profile.bio.map((para) => (
            <p key={para}>{para}</p>
          ))}
          <p className="hint">{profile.affiliation}</p>
        </div>
        <div className="card">
          <h2 className="card-heading">Right now</h2>
          <ul className="plain-list">
            {currentWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="hint" style={{ marginTop: '1.2rem' }}>
            Contact: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
