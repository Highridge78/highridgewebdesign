import Link from "next/link";
import { ReactNode } from "react";

export function ClientShell({
  projectTitle,
  projectPath,
  active,
  children,
}: {
  projectTitle: string;
  projectPath: string;
  active: "overview" | "approvals" | "onboarding";
  children: ReactNode;
}) {
  const nav = [
    { key: "overview", label: "Overview", href: projectPath },
    { key: "approvals", label: "Approvals", href: `${projectPath}/approvals` },
    { key: "onboarding", label: "Onboarding", href: `${projectPath}/onboarding` },
  ] as const;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.14em] text-sky-700">Client Portal</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{projectTitle}</h1>
          <p className="mt-2 text-sm text-slate-600">
            This portal shows approved project visibility for your team.
          </p>
          <nav className="mt-5 flex flex-wrap gap-2">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active === item.key
                    ? "bg-sky-700 font-semibold text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="mt-6">{children}</section>
      </div>
    </main>
  );
}
