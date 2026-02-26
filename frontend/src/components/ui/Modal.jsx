import { useEffect } from 'react';

/**
 * Modal – accessible dialog overlay.
 *
 * isOpen   – controls visibility
 * onClose  – called when backdrop or ✕ is clicked
 * title    – modal heading
 * children – modal body content
 * footer   – optional footer JSX (e.g. action buttons)
 * size     – 'sm' | 'md' | 'lg'
 */
const widthMap = { sm: 380, md: 560, lg: 760 };

function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0,0,0,0.4)',
      }}
      onClick={onClose}
    >
      <div
        className="panel"
        style={{ width: '100%', maxWidth: widthMap[size], maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="row-between" style={{ marginBottom: '1rem' }}>
          <h2 id="modal-title" style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: 1,
              color: '#64748b',
              padding: '0.25rem',
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              marginTop: '1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
