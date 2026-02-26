import { useEffect, useState } from 'react';

/**
 * Toast – transient notification snackbar.
 *
 * message  – text to display
 * type     – 'success' | 'error' | 'info' | 'warning'
 * duration – ms before auto-dismiss (default 3000, 0 = never)
 * onClose  – called after dismiss
 */
const typeStyles = {
  success: { background: '#16a34a', color: '#fff' },
  error:   { background: '#dc2626', color: '#fff' },
  warning: { background: '#d97706', color: '#fff' },
  info:    { background: '#2563eb', color: '#fff' },
};

function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const id = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 2000,
        maxWidth: 340,
        borderRadius: 10,
        padding: '0.75rem 1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        animation: 'slideUp 0.2s ease',
        ...typeStyles[type],
      }}
    >
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <span style={{ flexGrow: 1, fontSize: '0.9rem' }}>{message}</span>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => { setVisible(false); onClose?.(); }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: '1rem', lineHeight: 1 }}
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
