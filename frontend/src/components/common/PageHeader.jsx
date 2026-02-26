/**
 * PageHeader – consistent page title row with an optional action slot.
 *
 * title     – page heading text
 * subtitle  – optional supporting text
 * action    – optional JSX slot (e.g. a <Button> or <select>)
 */
function PageHeader({ title, subtitle, action }) {
  return (
    <div
      className="page-header"
      style={{ marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}
    >
      <div style={{ display: 'grid', gap: '0.2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: 0, fontSize: '0.87rem', color: '#64748b' }}>{subtitle}</p>
        )}
      </div>

      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}

export default PageHeader;
