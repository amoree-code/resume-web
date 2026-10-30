// Live resume on Google Drive — the single place every "Resume" / "CV" link points.
export const RESUME_URL =
  'https://drive.google.com/file/d/1AVBHYs8E43Jv3vrNLiU7tm_bJugXFW36/view?usp=drive_link';

export type ContactLink = {
  label: string;
  href: string;
  iconPath: string;
};

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:ameer.abdulkareem.lami@gmail.com',
    iconPath:
      'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Zm1.8.4 6.62 5.14a1 1 0 0 0 1.16 0L19.2 6.9M4 7v10.5h16V7l-7.4 5.75a2 2 0 0 1-2.4 0L4 7Z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/amoree-code',
    iconPath:
      'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ameer-abdulkareem',
    iconPath:
      'M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.2 0h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.33V21h-3.5v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.45 1.65-2.45 3.36V21H9.4V8.75Z',
  },
  {
    label: 'Phone',
    href: 'tel:+9647777665783',
    iconPath:
      'M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z',
  },
];
