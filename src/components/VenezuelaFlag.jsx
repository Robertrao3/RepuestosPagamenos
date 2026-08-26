const STARS = Array.from({ length: 8 }, (_, i) => {
  const t = i / 7;
  const angle = t * Math.PI;
  return {
    cx: 6 + t * 18,
    cy: 11.4 - 2.4 * Math.sin(angle),
  };
});

export function VenezuelaFlag({ className = "w-5 h-3.5 rounded-sm overflow-hidden shadow-sm shrink-0" }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-label="Bandera de Venezuela">
      <rect width="30" height="6.67" fill="#FFD100" />
      <rect y="6.67" width="30" height="6.67" fill="#00247D" />
      <rect y="13.33" width="30" height="6.67" fill="#CF142B" />
      <g fill="white">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r="0.75" />
        ))}
      </g>
    </svg>
  );
}
