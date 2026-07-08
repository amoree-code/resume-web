export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "28px 24px 50px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 11,
        color: "var(--faint)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <span>© 2026 Amir Abdulkarim Jabbar</span>
      <a
        href="mailto:amir.abdulkarim.jabbar@gmail.com"
        style={{ color: "var(--faint)", textDecoration: "none" }}
      >
        amir.abdulkarim.jabbar@gmail.com
      </a>
    </footer>
  );
}
