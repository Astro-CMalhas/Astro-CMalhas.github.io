import { useEffect, useMemo, useState } from 'react';
import OutflowPlot from '../components/OutflowPlot.jsx';
import RangeSlider from '../components/RangeSlider.jsx';
import Donut from '../components/Donut.jsx';
import {
  IONS,
  MEASURES,
  dataBounds,
  fmtNum,
  getError,
  getValue,
  loadOutflowData,
  median,
} from '../lib/outflows.js';

const X_AXES = [
  { key: 'logMstar', label: 'log M* (log solar masses)', short: 'log M*' },
  { key: 'logSfr', label: 'log SFR (log solar masses per year)', short: 'log SFR' },
];

const inBand = (v, [lo, hi]) => v !== null && v >= lo && v <= hi;
const formatMass = (v) => v.toFixed(2);
const formatSfr = (v) => (10 ** v).toPrecision(3);

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function Explorer() {
  const [rows, setRows] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [ionKey, setIonKey] = useState('Si_II_1190');
  const [measureKey, setMeasureKey] = useState('V_90');
  const [xKey, setXKey] = useState('logMstar');
  const [massRange, setMassRange] = useState(null);
  const [sfrRange, setSfrRange] = useState(null);

  useEffect(() => {
    loadOutflowData().then(setRows).catch((err) => setLoadError(err.message));
  }, []);

  const ion = IONS.find((i) => i.key === ionKey);
  const measure = MEASURES.find((m) => m.key === measureKey);
  const xAxis = X_AXES.find((a) => a.key === xKey);
  const digits = measure.isVelocity ? 0 : 2;
  const bounds = useMemo(() => (rows ? dataBounds(rows) : null), [rows]);

  // Every galaxy with this line and quantity, before slider filtering.
  // Velocities are plotted as absolute values (the CSV stores them as negative).
  const withValues = useMemo(() => {
    if (!rows) return [];
    return rows.map((row) => {
      const raw = getValue(row, ionKey, measureKey);
      return {
        ...row,
        y: raw === null ? null : measure.isVelocity ? Math.abs(raw) : raw,
        err: getError(row, ionKey, measureKey),
      };
    });
  }, [rows, ionKey, measureKey, measure.isVelocity]);

  if (loadError) return <p className="notice">Could not load the data: {loadError}.</p>;
  if (!rows || !bounds) return <p className="notice">Loading data…</p>;

  const mass = massRange ?? bounds.mass;
  const sfr = sfrRange ?? bounds.sfr;
  const xDomain = xKey === 'logMstar' ? bounds.mass : bounds.sfr;

  const measured = withValues
    .filter((p) => p.y !== null)
    .map((p) => ({
      ...p,
      x: xKey === 'logMstar' ? p.logMstar : p.logSfr,
      inRange: inBand(p.logMstar, mass) && inBand(p.logSfr, sfr),
    }))
    .filter((p) => p.x !== null);

  const inView = measured.filter((p) => p.inRange);
  const yMax = Math.max(1, ...withValues.filter((p) => p.y !== null).map((p) => p.y + (p.err ?? 0)));
  const coverage = Math.round((measured.length / rows.length) * 100);
  const medianY = median(inView.map((p) => p.y));
  const maxY = inView.length ? Math.max(...inView.map((p) => p.y)) : null;

  const resetFilters = () => {
    setMassRange(null);
    setSfrRange(null);
  };

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Outflow data explorer</h1>
          <p className="lede">
            Absorption-line measurements for {rows.length} galaxies. Pick a line and a quantity,
            then use the sliders to narrow the sample.
          </p>
        </div>
        <button type="button" className="btn" onClick={resetFilters}>Reset filters</button>
      </header>

      <section className="stat-grid">
        <div className="card stat">
          <div className="stat-value">
            {inView.length}<span className="stat-of"> of {measured.length}</span>
          </div>
          <div className="stat-label">galaxies in the current range</div>
        </div>
        <div className="card stat">
          <div className="stat-value">{fmtNum(medianY, digits)}</div>
          <div className="stat-label">median {measure.label} in range ({measure.unit})</div>
        </div>
        <div className="card stat">
          <div className="stat-value">{fmtNum(maxY, digits)}</div>
          <div className="stat-label">largest {measure.label} in range ({measure.unit})</div>
        </div>
        <div className="card stat stat-donut">
          <Donut percent={coverage} />
          <div>
            <div className="stat-value">{measured.length}</div>
            <div className="stat-label">galaxies measured for {ion.label}</div>
          </div>
        </div>
      </section>

      <div className="explore-layout">
        <aside className="card controls">
          <h2 className="card-heading">What to plot</h2>
          <Field label="Absorption line">
            <select value={ionKey} onChange={(e) => setIonKey(e.target.value)}>
              {IONS.map((i) => (
                <option key={i.key} value={i.key}>{i.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Quantity">
            <select value={measureKey} onChange={(e) => setMeasureKey(e.target.value)}>
              {MEASURES.map((m) => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          </Field>
          <Field label="X axis">
            <select value={xKey} onChange={(e) => setXKey(e.target.value)}>
              {X_AXES.map((a) => (
                <option key={a.key} value={a.key}>{a.label}</option>
              ))}
            </select>
          </Field>

          <h2 className="card-heading" style={{ marginTop: '1.4rem' }}>Filter the sample</h2>
          <RangeSlider
            label="Stellar mass, log M*"
            min={bounds.mass[0]}
            max={bounds.mass[1]}
            step={0.05}
            value={mass}
            onChange={setMassRange}
            format={formatMass}
          />
          <RangeSlider
            label="Star formation rate (M☉/yr)"
            min={bounds.sfr[0]}
            max={bounds.sfr[1]}
            step={0.05}
            value={sfr}
            onChange={setSfrRange}
            format={formatSfr}
          />
          <p className="hint">
            The SFR slider moves in log steps, so small moves at low SFR change the value a lot.
          </p>
        </aside>

        <section className="card">
          <h2 className="card-heading">
            {ion.label}: {measure.label} against {xAxis.short}
          </h2>
          <OutflowPlot
            points={measured}
            xLabel={xAxis.label}
            yLabel={`${measure.isVelocity ? `|${measure.label}|` : measure.label} (${measure.unit})`}
            xDomain={xDomain}
            yDomain={[0, yMax * 1.08]}
            digits={digits}
          />
          <p className="hint">
            Error bars come from the matching _err columns. Faded points fall outside the slider ranges.
            Velocities are shown as absolute values because the CSV stores outflows as negative numbers.
          </p>

          <details>
            <summary>Show data table ({measured.length} galaxies)</summary>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Galaxy</th>
                    <th className="num">log M*</th>
                    <th className="num">SFR</th>
                    <th className="num">{measure.label} ({measure.unit})</th>
                    <th>In range</th>
                  </tr>
                </thead>
                <tbody>
                  {measured.map((p) => (
                    <tr key={p.id} className={p.inRange ? '' : 'off'}>
                      <td>{p.name}</td>
                      <td className="num">{fmtNum(p.logMstar, 2)}</td>
                      <td className="num">{fmtNum(p.SFR, 2)}</td>
                      <td className="num">
                        {fmtNum(p.y, digits)}
                        {p.err !== null ? ` ± ${fmtNum(p.err, digits)}` : ''}
                      </td>
                      <td>{p.inRange ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </section>
      </div>
    </>
  );
}
