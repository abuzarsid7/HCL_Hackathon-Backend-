/**
 * QuantityControl – +/− stepper for cart quantity adjustment.
 *
 * value    – current quantity
 * min      – minimum allowed (default 0)
 * max      – maximum allowed
 * onChange – (newValue: number) => void
 * disabled – disables all controls
 */
function QuantityControl({ value, min = 0, max, onChange, disabled = false }) {
  const decrement = () => {
    const next = value - 1;
    if (next >= min) onChange?.(next);
  };

  const increment = () => {
    const next = value + 1;
    if (max === undefined || next <= max) onChange?.(next);
  };

  return (
    <div
      role="group"
      aria-label="Quantity"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
    >
      <button
        type="button"
        aria-label="Decrease"
        disabled={disabled || value <= min}
        onClick={decrement}
        className="btn btn-secondary"
        style={{ padding: '0.25rem 0.5rem', minWidth: 30, fontSize: '1rem', lineHeight: 1 }}
      >
        −
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!isNaN(val) && val >= min && (max === undefined || val <= max)) {
            onChange?.(val);
          }
        }}
        style={{ width: 52, textAlign: 'center' }}
        aria-label="Quantity value"
      />

      <button
        type="button"
        aria-label="Increase"
        disabled={disabled || (max !== undefined && value >= max)}
        onClick={increment}
        className="btn"
        style={{ padding: '0.25rem 0.5rem', minWidth: 30, fontSize: '1rem', lineHeight: 1 }}
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
