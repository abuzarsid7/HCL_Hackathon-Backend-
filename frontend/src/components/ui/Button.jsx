/**
 * Button – wrapper around the .btn class with variant support.
 *
 * variant: 'primary' | 'secondary' | 'danger' | 'ghost'
 * size:    'sm' | 'md' | 'lg'
 */
const variantClass = {
  primary:   'btn',
  secondary: 'btn btn-secondary',
  danger:    'btn btn-danger',
  ghost:     'btn btn-ghost',
};

const sizeStyle = {
  sm: { padding: '0.3rem 0.55rem', fontSize: '0.82rem' },
  md: {},
  lg: { padding: '0.65rem 1.1rem', fontSize: '1rem' },
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  ...rest
}) {
  return (
    <button
      className={variantClass[variant] ?? 'btn'}
      style={{
        ...(fullWidth ? { width: '100%' } : {}),
        ...sizeStyle[size],
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        justifyContent: 'center',
        ...style,
      }}
      {...rest}
    >
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}

export default Button;
