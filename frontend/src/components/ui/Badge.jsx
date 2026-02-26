/**
 * Badge – small status/category pill.
 *
 * variant: 'default' | 'success' | 'warning' | 'danger' | 'info'
 */
const variantStyles = {
  default: { background: '#e2e8f0', color: '#334155' },
  success: { background: '#dcfce7', color: '#15803d' },
  warning: { background: '#fef9c3', color: '#a16207' },
  danger:  { background: '#fee2e2', color: '#b91c1c' },
  info:    { background: '#e0ecff', color: '#1d4ed8' },
};

function Badge({ children, variant = 'default', style, ...rest }) {
  const base = {
    display: 'inline-block',
    fontSize: '0.72rem',
    fontWeight: 600,
    padding: '0.2rem 0.55rem',
    borderRadius: '999px',
    letterSpacing: '0.02em',
    ...variantStyles[variant],
    ...style,
  };

  return (
    <span style={base} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
