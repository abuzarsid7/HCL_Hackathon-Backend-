/**
 * StatCard – KPI tile used on the seller dashboard.
 *
 * label    – metric name
 * value    – formatted metric value (string or number)
 * icon     – emoji or JSX displayed in the top-right
 * trend    – optional "+12%" style string
 * positive – true = green trend, false = red trend
 */
function StatCard({ label, value, icon, trend, positive = true }) {
  return (
    <article
      className="card"
      style={{ gap: '0.5rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background accent stripe */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          borderRadius: '10px 0 0 10px',
          background: '#2563eb',
        }}
      />

      <div className="row-between" style={{ paddingLeft: '0.5rem' }}>
        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>{label}</span>
        {icon && <span style={{ fontSize: '1.4rem' }}>{icon}</span>}
      </div>

      <strong style={{ fontSize: '1.6rem', paddingLeft: '0.5rem', color: '#0f172a' }}>
        {value}
      </strong>

      {trend && (
        <span
          style={{
            paddingLeft: '0.5rem',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: positive ? '#15803d' : '#b91c1c',
          }}
        >
          {trend}
        </span>
      )}
    </article>
  );
}

export default StatCard;
