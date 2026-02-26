/**
 * Select – labelled dropdown with built-in error display.
 *
 * label   – visible label text
 * options – array of { value, label } objects
 * error   – validation error string
 */
function Select({ label, options = [], error, id, containerStyle, ...rest }) {
  const selectId = id ?? `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <label
      htmlFor={selectId}
      style={{ display: 'grid', gap: '0.35rem', ...containerStyle }}
    >
      {label && <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{label}</span>}

      <select
        id={selectId}
        style={{ borderColor: error ? '#dc2626' : undefined }}
        aria-invalid={!!error}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <small className="error">{error}</small>}
    </label>
  );
}

export default Select;
