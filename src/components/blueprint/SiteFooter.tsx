import type { ReactNode } from "react";
import { profile } from "@/data/profile";

function Cell({ children, label = false, span }: { children: ReactNode; label?: boolean; span?: number }) {
  return (
    <td colSpan={span} className={`border-[1.5px] border-ink px-3 py-2 ${label ? "text-ink-muted" : ""}`}>
      {children}
    </td>
  );
}

/** Contact plus the drawing's title block, in the bottom-right corner like on a real sheet. */
export function SiteFooter({ dwg = "KSZ-001" }: { dwg?: string }) {
  return (
    <footer id="contact" className="flex flex-wrap items-end justify-between gap-6 border-t-[1.5px] border-ink px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-3">
        <h2 className="m-0 text-[clamp(32px,5vw,44px)] leading-none font-semibold uppercase">Let&apos;s build something</h2>
        <p className="m-0 max-w-md text-lg leading-snug">{profile.lookingFor}.</p>
        <div className="flex flex-wrap gap-5 font-mono text-sm">
          <a href={`mailto:${profile.email}`} className="hover:text-accent">
            {profile.email}
          </a>
          <a href={profile.linkedin} className="hover:text-accent">
            LINKEDIN
          </a>
          <a href={profile.github} className="hover:text-accent">
            GITHUB
          </a>
        </div>
      </div>
      <table className="w-full max-w-[420px] border-collapse font-mono text-xs tracking-[0.06em] sm:w-auto sm:min-w-[360px]">
        <tbody>
          <tr>
            <Cell label>DRAWN BY</Cell>
            <Cell span={3}>KAUNG SET ZAN ({profile.nickname.toUpperCase()})</Cell>
          </tr>
          <tr>
            <Cell label>LOCATION</Cell>
            <Cell>BERLIN, DE</Cell>
            <Cell label>SCALE</Cell>
            <Cell>1:1</Cell>
          </tr>
          <tr>
            <Cell label>DWG NO.</Cell>
            <Cell>{dwg}</Cell>
            <Cell label>SHEET</Cell>
            <Cell>1 / 1</Cell>
          </tr>
        </tbody>
      </table>
    </footer>
  );
}
