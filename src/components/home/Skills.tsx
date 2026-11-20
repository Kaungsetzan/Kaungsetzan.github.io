import { SectionHeader } from "@/components/blueprint/SectionHeader";
import { skills } from "@/data/profile";

/** Skills as a drawing's bill of materials: item, group, parts. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="flex scroll-mt-4 flex-col gap-7 px-5 py-12 sm:px-8">
      <SectionHeader id="skills-title" title="Skills" />
      <table className="w-full border-collapse font-mono text-sm">
        <thead>
          <tr className="text-left text-xs tracking-[0.12em] text-ink-muted">
            <th scope="col" className="w-14 border-[1.5px] border-ink px-3 py-2 font-normal">ITEM</th>
            <th scope="col" className="w-44 border-[1.5px] border-ink px-3 py-2 font-normal">GROUP</th>
            <th scope="col" className="border-[1.5px] border-ink px-3 py-2 font-normal">PARTS</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s, i) => (
            <tr key={s.group} className="align-top">
              <td className="border-[1.5px] border-ink px-3 py-3 text-accent">{String(i + 1).padStart(2, "0")}</td>
              <th scope="row" className="border-[1.5px] border-ink px-3 py-3 text-left font-semibold uppercase">
                {s.group}
              </th>
              <td className="border-[1.5px] border-ink px-3 py-2.5">
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {s.items.map((it) => (
                    <li key={it} className="border border-ink/70 px-2 py-0.5">
                      {it}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
