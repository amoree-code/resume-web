import { CONTACT_LINKS } from "@/lib/contact";

const emailLink = CONTACT_LINKS.find((l) => l.label === "Email")!;

export default function Footer() {
  return (
    <footer className="container site-footer mono">
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
