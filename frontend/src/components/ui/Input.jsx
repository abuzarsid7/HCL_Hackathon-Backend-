/**
 * Input – labelled form input with built-in error display.
 *
 * label      – visible label text (required for accessibility)
 * error      – validation error string
 * hint       – optional helper text below the field
 * leftAddon  – prefix text/icon (e.g. "$")
 */
function Input({
  label,
  error,
  hint,
  leftAddon,
  id,
  style,
  containerStyle,
  ...rest
}) {
  const inputId = id ?? `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <label
      htmlFor={inputId}
      style={{ display: 'grid', gap: '0.35rem', ...containerStyle }}
    >
      {label && <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{label}</span>}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftAddon && (
          <span
            style={{
              position: 'absolute',
              left: '0.55rem',
              color: '#64748b',
              fontSize: '0.9rem',
              pointerEvents: 'none',
            }}
          >
            {leftAddon}
          </span>
        )}
        <input
          id={inputId}
          style={{
            paddingLeft: leftAddon ? '1.8rem' : undefined,
            borderColor: error ? '#dc2626' : undefined,
            ...style,
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
      </div>

      {error && (
        <small id={`${inputId}-error`} className="error">
          {error}
        </small>
      )}
      {hint && !error && (
        <small id={`${inputId}-hint`} style={{ color: '#64748b', fontSize: '0.78rem' }}>
          {hint}
        </small>
      )}
    </label>
  );
}

export default Input;
