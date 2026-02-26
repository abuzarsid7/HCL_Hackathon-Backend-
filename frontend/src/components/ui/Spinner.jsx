/**
 * Spinner – animated loading indicator.
 *
 * size:  'sm' | 'md' | 'lg'
 * label: accessible description (defaults to "Loading…")
 */
const sizeMap = { sm: 18, md: 28, lg: 44 };

function Spinner({ size = 'md', label = 'Loading…', color = '#2563eb' }) {
  const px = sizeMap[size] ?? 28;

  return (
    <span
      role="status"
      aria-label={label}
      style={{
        display: 'inline-block',
        width: px,
        height: px,
      }}
    >
      <svg
        viewBox="0 0 50 50"
        width={px}
        height={px}
        style={{ animation: 'spin 0.8s linear infinite' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray="80 40"
          strokeLinecap="round"
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </svg>
    </span>
  );
}

export default Spinner;
