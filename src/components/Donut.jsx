// Ring showing a percentage. Uses pathLength=100 so the dash array reads as percent.
export default function Donut({ percent }) {
  return (
    <svg className="donut" viewBox="0 0 36 36" role="img" aria-label={`${percent} percent measured`}>
      <circle className="donut-track" cx="18" cy="18" r="15.9155" />
      <circle
        className="donut-fill"
        cx="18"
        cy="18"
        r="15.9155"
        pathLength="100"
        strokeDasharray={`${percent} ${100 - percent}`}
        transform="rotate(-90 18 18)"
      />
      <text className="donut-text" x="18" y="20.5" textAnchor="middle">{percent}%</text>
    </svg>
  );
}
