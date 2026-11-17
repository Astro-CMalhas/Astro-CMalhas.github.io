import { useState } from 'react';

const W = 760;
const H = 460;
const PAD = { top: 18, right: 24, bottom: 58, left: 72 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

// Round tick spacing to 1, 2 or 5 times a power of ten.
function niceTicks(lo, hi, target = 5) {
  const span = hi - lo || 1;
  const raw = span / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const f = raw / mag;
  const step = (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag;
  const ticks = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi + step * 1e-9; t += step) {
    ticks.push(Number(t.toFixed(6)));
  }
  return ticks;
}

export default function OutflowPlot({ points, xLabel, yLabel, xDomain, yDomain, digits }) {
  const [active, setActive] = useState(null);
  const [x0, x1] = xDomain;
  const [y0, y1] = yDomain;

  const sx = (v) => PAD.left + ((v - x0) / (x1 - x0)) * PW;
  const sy = (v) => PAD.top + PH - ((v - y0) / (y1 - y0)) * PH;
  const xTicks = niceTicks(x0, x1, 6);
  const yTicks = niceTicks(y0, y1, 5);

  const current = points.find((p) => p.id === active) ?? null;
  const readout = current
    ? `${current.name}: x = ${current.x.toFixed(2)}, y = ${current.y.toFixed(digits)}` +
      (current.err !== null ? ` ± ${current.err.toFixed(digits)}` : '') +
      (current.inRange ? '' : ' (outside the slider range)')
    : 'Hover or tab to a point to see its values.';

  return (
    <figure className="plot">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${yLabel} against ${xLabel}, ${points.length} galaxies`}>
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line className="grid" x1={PAD.left} x2={W - PAD.right} y1={sy(t)} y2={sy(t)} />
            <text className="tick" x={PAD.left - 10} y={sy(t)} textAnchor="end" dominantBaseline="middle">{t}</text>
          </g>
        ))}
        {xTicks.map((t) => (
          <g key={`x${t}`}>
            <line className="grid" x1={sx(t)} x2={sx(t)} y1={PAD.top} y2={PAD.top + PH} />
            <text className="tick" x={sx(t)} y={PAD.top + PH + 22} textAnchor="middle">{t}</text>
          </g>
        ))}
        <rect className="frame" x={PAD.left} y={PAD.top} width={PW} height={PH} />
        <text className="axis-label" x={PAD.left + PW / 2} y={H - 12} textAnchor="middle">{xLabel}</text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(20 ${PAD.top + PH / 2}) rotate(-90)`}
        >
          {yLabel}
        </text>

        {points.map((p) => {
          const cx = sx(p.x);
          const cy = sy(p.y);
          const hasErr = p.err !== null;
          const top = hasErr ? sy(p.y + p.err) : cy;
          const bottom = hasErr ? sy(Math.max(p.y - p.err, y0)) : cy;
          const classes = ['pt', p.inRange ? 'in' : 'off', active === p.id ? 'active' : ''].join(' ');
          return (
            <g
              key={p.id}
              className={classes}
              tabIndex={0}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.id)}
              onBlur={() => setActive(null)}
            >
              <title>{p.name}</title>
              {hasErr && (
                <>
                  <line className="err" x1={cx} x2={cx} y1={top} y2={bottom} />
                  <line className="err" x1={cx - 4} x2={cx + 4} y1={top} y2={top} />
                  <line className="err" x1={cx - 4} x2={cx + 4} y1={bottom} y2={bottom} />
                </>
              )}
              <circle cx={cx} cy={cy} r={active === p.id ? 7 : 5} />
            </g>
          );
        })}
      </svg>
      <figcaption className="readout" aria-live="polite">{readout}</figcaption>
    </figure>
  );
}
