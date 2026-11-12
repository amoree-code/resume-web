import { RESUME_URL } from "@/lib/contact";

// Opens the live resume on Google Drive (view + download live there).
export default function CvDownloadButton() {
  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-ghost cv-download-btn"
      data-magnetic
    >
      <svg
        className="cv-download-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      Download CV
    </a>
  );
}
