/**
 * EmptyState – friendly placeholder shown when a list is empty.
 *
 * icon    – emoji or JSX element
 * title   – main heading
 * message – supporting text
 * action  – optional JSX (e.g. a <Button>)
 */
function EmptyState({
  icon = '🍽️',
  title = 'Nothing here yet',
  message,
  action,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        gap: '0.75rem',
        textAlign: 'center',
        color: '#64748b',
      }}
    >
      <span style={{ fontSize: '3rem', lineHeight: 1 }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937' }}>{title}</h3>
      {message && <p style={{ margin: 0, fontSize: '0.9rem' }}>{message}</p>}
      {action && <div style={{ marginTop: '0.5rem' }}>{action}</div>}
    </div>
  );
}

export default EmptyState;
