"use client";

import { useState } from "react";

type DownloadState = "idle" | "downloading" | "downloaded";

const LABELS: Record<DownloadState, string> = {
  idle: "Download CV",
  downloading: "Downloading…",
  downloaded: "Downloaded",
};

export default function CvDownloadButton() {
  const [state, setState] = useState<DownloadState>("idle");

  function handleClick() {
    if (state !== "idle") return;
    setState("downloading");

    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Amir-Abdulkarim-Jabbar-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setState("downloaded"), 700);
    setTimeout(() => setState("idle"), 2700);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cv-download-btn"
      style={{
        border: "1px solid rgba(255,255,255,.3)",
        background: "rgba(255,255,255,.08)",
        backdropFilter: "blur(6px)",
        color: "#fff",
        borderRadius: 999,
        padding: "8px 16px",
        fontSize: 12,
        fontWeight: 700,
        cursor: state === "idle" ? "pointer" : "default",
      }}
    >
      <span
        className={
          state === "idle"
            ? "cv-download-pulse"
            : undefined
        }
        style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
      >
        <svg
          className="cv-download-icon"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {state === "downloaded" ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </>
          )}
        </svg>
        <span aria-live="polite">{LABELS[state]}</span>
      </span>
    </button>
  );
}
