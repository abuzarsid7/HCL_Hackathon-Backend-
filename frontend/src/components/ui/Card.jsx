/**
 * Card – generic container matching the .card design token.
 *
 * hoverable: adds pointer cursor + subtle lift on hover
 */
function Card({ children, hoverable = false, onClick, style, className, ...rest }) {
  const hoverStyle = hoverable
    ? {
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
      }
    : {};

  return (
    <article
      className={`card ${className ?? ''}`.trim()}
      onClick={onClick}
      style={{ ...hoverStyle, ...style }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.transform = '';
        }
      }}
      {...rest}
    >
      {children}
    </article>
  );
}

export default Card;
