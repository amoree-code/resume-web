import { CONTACT_LINKS } from "@/lib/contact";

const emailLink = CONTACT_LINKS.find((l) => l.label === "Email")!;

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
      <span>© 2026 Ameer Abdulkareem Jabbar Lami</span>
      <a
        href={emailLink.href}
        style={{ color: "var(--faint)", textDecoration: "none" }}
      >
        ameer.abdulkareem.lami@gmail.com
      </a>
    </footer>
  );
}
