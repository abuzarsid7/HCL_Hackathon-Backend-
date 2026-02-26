/**
 * Footer – simple app footer.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid #dbe3f0',
        background: '#ffffff',
        padding: '1rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.82rem',
        color: '#64748b',
      }}
    >
      <span>🍕 Food Ordering System &copy; {year}</span>
      <span>Fast delivery · Fresh food · Happy customers</span>
    </footer>
  );
}

export default Footer;
