// Two range inputs stacked on one track: a lower and an upper limit.
export default function RangeSlider({ label, min, max, step, value, onChange, format }) {
  const [lo, hi] = value;
  const pct = (v) => ((v - min) / (max - min)) * 100;

  const update = (isLower, next) => {
    if (isLower) onChange([Math.min(next, hi), hi]);
    else onChange([lo, Math.max(next, lo)]);
  };

  // When both thumbs sit at the top, the lower one must stay grabbable.
  const lowerOnTop = lo >= max - (max - min) * 0.05;

  return (
    <div className="range">
      <div className="range-head">
        <span>{label}</span>
        <span className="mono">{format(lo)} to {format(hi)}</span>
      </div>
      <div className="range-track">
        <div
          className="range-fill"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          style={{ zIndex: lowerOnTop ? 2 : 1 }}
          onChange={(e) => update(true, Number(e.target.value))}
          aria-label={`${label}, lower limit`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          style={{ zIndex: lowerOnTop ? 1 : 2 }}
          onChange={(e) => update(false, Number(e.target.value))}
          aria-label={`${label}, upper limit`}
        />
      </div>
    </div>
  );
}
