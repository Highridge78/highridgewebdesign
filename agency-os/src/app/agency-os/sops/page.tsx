import Link from "next/link";
import { InternalShell } from "@/components/agency-os/internal-shell";
import { SopCreateForm } from "@/components/agency-os/sop-create-form";
import { StatusBadge } from "@/components/agency-os/status-badge";
import { getSops } from "@/lib/agency-os/phase3/selectors";

export default async function SopsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const sops = getSops(q);

  return (
    <InternalShell
      title="SOP / Knowledge Base"
      subtitle="Practical internal SOPs with checklists to improve consistency and delivery quality."
    >
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <form className="mb-3">
            <input name="q" defaultValue={q || ""} placeholder="Search SOPs" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
          </form>
          <div className="space-y-3">
            {sops.map((sop) => (
              <article key={sop.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold">{sop.title}</h2>
                    <p className="text-sm text-slate-400">{sop.category} · owner {sop.owner}</p>
                  </div>
                  <StatusBadge label={sop.status} tone={sop.status === "active" ? "good" : "warn"} />
                </div>
                <p className="mt-2 text-sm text-slate-300">{sop.purpose}</p>
                <Link href={`/agency-os/sops/${sop.id}`} className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
                  Open SOP
                </Link>
              </article>
            ))}
          </div>
        </div>

        <SopCreateForm />
      </div>
    </InternalShell>
  );
}
